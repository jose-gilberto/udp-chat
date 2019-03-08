const dgram = require('dgram');
const port = 41234;
const clients = [];

const server = dgram.createSocket('udp4');

const typeMessage = (data, rinfo) => {

	const datagram = data.toString(), [ header, message ] = datagram.split("|");

	if (header === "connect") {

		const [ username, date ] =  message.split(";");
		
		const newClient = {
			address: rinfo.address,
			port: rinfo.port,
			username: username
		}

		clientConnect(rinfo);


	} else if (header === "disconnect") {

	} else {

	}

}

const clientConnect = rinfo => {
	const message = `
	<p class="card-text">
		<i class="fas fa-server"></i> <b>Server:</b> <br/> <span class="message-text">New connection from ${ rinfo.address }.</span>
	</p>
	`;
	
	clients.push(rinfo);

	//broadcast message
}

const clientDisconnect = rinfo => {
	const message = `
	<p class="card-text">
		<i class="fas fa-server"></i> <b>Server:</b> <br/> <span class="message-text">Client ${ rinfo.address } has disconnected.</span>
	</p>
	`;

	clients.splice(clients.indexOf(rinfo), 1);

	//broadcast message
}

const broadcast = message => {
	const buffer = new Buffer(message);

	clients.forEach(currClient => {
		server.send(buffer, currClient.port, currClient.address, err => {
			server.close();
		});
	});
}

const startServer = () => {

	if (op === 1) {
		// start server
		const indicator = document.getElementById("status-server-indicator");
		indicator.style.color = "#89C735";

		const statusServer = document.getElementById("status-server");
		statusServer.innerHTML = "Online";

		const btnServer = document.getElementById("btn-server");
		btnServer.innerHTML = "Stop";

		op = 0;

		server.on('error', err => {
			console.log(`server error:\n${err.stack}`);
			server.close();
		});

		server.on('message', (msg, rinfo) => {
			console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

			let message = msg.toString();

			// usuario|dd:mm:yy hh:mm:ss|msg
			let splitedMessage = message.split("|");

			document.getElementById('messageBox').innerHTML += `<p class="card-text"><i class="fas fa-user"></i> <b>${rinfo.address}</b> <small>(${splitedMessage[0]})</small> <br/> <span class="message-text">${splitedMessage[1]}</span></p>`;

			document.getElementById('messageBox').scrollTop = document.getElementById('messageBox').scrollHeight;
		});

		server.on('listening', () => {
			const address = server.address();
			console.log(`server listening on port ${address.port}`);
		});

		server.bind(port);

		document.getElementById('messageBox').innerHTML += `<p class="card-text"><i class="fas fa-server"></i> <b>Server:</b> <br/> <span class="message-text">Server started on port ${port}!</span> </p>`;

		document.getElementById('messageBox').scrollTop = document.getElementById('messageBox').scrollHeight;

	} else {
		// stop server
		const indicator = document.getElementById("status-server-indicator");
		indicator.style.color = "#E83541";

		const statusServer = document.getElementById("status-server");
		statusServer.innerHTML = "Offline";

		const btnServer = document.getElementById("btn-server");
		btnServer.innerHTML = "Start";

		op = 1;

		server.close();

		document.getElementById('messageBox').innerHTML += `<p class="card-text"><i class="fas fa-server"></i> <b>Server:</b> <br/> <span class="message-text">Server is now Offline!</span> </p>`;

		document.getElementById('messageBox').scrollTop = document.getElementById('messageBox').scrollHeight;

	}

}