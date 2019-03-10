/** imports */
const dgram = require('dgram');

/** constants */
const PORT = 6024;
const SRC_PORT = 6025;
const MCAST_ADDR = "239.255.255.250"; // Class D - Multicast
const LCL_ADDR = "192.168.0.104";

/** creating a UDP socket instance */
const server = dgram.createSocket('udp4');

/**
 * @function broadcast
 * @description Send a message for all users in same multcast group.
 * @param {string} message 
 */
const broadcast = message => {
	const buffer = new Buffer.from(message);
	
	server.send(buffer, 0, message.length, PORT, MCAST_ADDR, err => {
		if (err) console.log(err);
		console.log("Message Send!");
	});
}

/**
 * @function startServer
 * @description Manager the start/stop of server.
 */
const startServer = () => {

	// If the operator is equals to 1 means that server is offline and the function will turn on
	if (op === 1) {
		/** changing dashboard styles  */
		const indicator = document.getElementById("status-server-indicator");
		indicator.style.color = "#89C735";

		const statusServer = document.getElementById("status-server");
		statusServer.innerHTML = "Online";

		const btnServer = document.getElementById("btn-server");
		btnServer.innerHTML = "Stop";

		op = 0;

		/** handle errors */
		server.on('error', err => {
			//TODO: handle erros
			console.log(`server error:\n${err.stack}`);
			server.close();
		});

		server.on('message', (msg, rinfo) => {
			console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
			/*
			let message = msg.toString();

			// usuario|dd:mm:yy hh:mm:ss|msg
			let splitedMessage = message.split("|");

			document.getElementById('messageBox').innerHTML += `<p class="card-text"><i class="fas fa-user"></i> <b>${rinfo.address}</b> <small>(${splitedMessage[0]})</small> <br/> <span class="message-text">${splitedMessage[1]}</span></p>`;

			document.getElementById('messageBox').scrollTop = document.getElementById('messageBox').scrollHeight; */
		});

		server.on('listening', () => {
			const address = server.address();
			console.log(`Server listening on port ${address.port}`);
		});

		server.bind(SRC_PORT, '192.168.0.104', err => {
			if (err) console.log(err);
			/*
			setInterval(function () {
				let message = new Buffer(new Date().toLocaleTimeString());
				server.send(message, 0, message.length, PORT, MCAST_ADDR, function () {
					console.log("Sent '" + message + "'");
				});
			}, 4000);
			*/
		});
		
		/** exibing message that now server is online */
		document.getElementById('messageBox').innerHTML += `
		<p class="card-text">
			<i class="fas fa-server"></i> <b>Server</b>: <br/> 
			<span class="message-text">Server started on port ${PORT}!</span> 
		</p>`;

		document.getElementById('messageBox').scrollTop = document.getElementById('messageBox').scrollHeight;
	} else {
		// If the operator is diff than 1 so the server is online and the function will turn off it
		/** changing dashboard styles */
		const indicator = document.getElementById("status-server-indicator");
		indicator.style.color = "#E83541";

		const statusServer = document.getElementById("status-server");
		statusServer.innerHTML = "Offline";

		const btnServer = document.getElementById("btn-server");
		btnServer.innerHTML = "Start";

		op = 1;

		/** closing UDP socket */
		server.close();

		document.getElementById('messageBox').innerHTML += `<p class="card-text"><i class="fas fa-server"></i> <b>Server:</b> <br/> <span class="message-text">Server is now Offline!</span> </p>`;

		document.getElementById('messageBox').scrollTop = document.getElementById('messageBox').scrollHeight;
	}

}