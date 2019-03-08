/** imports */
const dgram = require('dgram');

/** constants */
const PORT = 41234;
const MCAST_ADDR = "230.185.192.108";

/** creating a UDP socket instance */
const server = dgram.createSocket({ type: 'udp4', reuseAddr: true });

const broadcast = message => {
	const buffer = new Buffer(message);
	server.send(buffer, 0, message.length, PORT, MCAST_ADDR, err => {
		if (err) console.log(err);
		console.log("Message Send!");
	});
}

const startServer = () => {

	if (op === 1) {
		// start server

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
			console.log(`server error:\n${err.stack}`);
			server.close();
		});

		server.on('message', (msg, rinfo) => {
			//TODO: receive message
			console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
			/*
			let message = msg.toString();

			// usuario|dd:mm:yy hh:mm:ss|msg
			let splitedMessage = message.split("|");

			document.getElementById('messageBox').innerHTML += `<p class="card-text"><i class="fas fa-user"></i> <b>${rinfo.address}</b> <small>(${splitedMessage[0]})</small> <br/> <span class="message-text">${splitedMessage[1]}</span></p>`;

			document.getElementById('messageBox').scrollTop = document.getElementById('messageBox').scrollHeight; */

			// broadcast message
		});

		server.on('listening', () => {
			const address = server.address();
			console.log(`server listening on port ${address.port}`);
		});

		server.bind(PORT, () => {
			/** enable multicast and setting datagram TTL */
			server.setBroadcast(true);
			server.setMulticastTTL(128);
			server.addMembership(MCAST_ADDR);
		});

		document.getElementById('messageBox').innerHTML += `<p class="card-text"><i class="fas fa-server"></i> <b>Server:</b> <br/> <span class="message-text">Server started on port ${PORT}!</span> </p>`;

		document.getElementById('messageBox').scrollTop = document.getElementById('messageBox').scrollHeight;

	} else {
		broadcast("Olá Mundo!");
		/*
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
		*/
	}

}