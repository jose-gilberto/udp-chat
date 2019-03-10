const SRC_PORT = 6025;
const PORT = 6024;
const MULTICAST_ADDR = '239.255.255.250';
const LOCAL_IP = '192.168.0.104';
const dgram = require('dgram');
const server = dgram.createSocket("udp4");

server.bind(SRC_PORT, LOCAL_IP, function () {
    setInterval(function () {
        let message = new Buffer(new Date().toLocaleTimeString());
        server.send(message, 0, message.length, PORT, MULTICAST_ADDR, function () {
            console.log("Sent '" + message + "'");
        });
    }, 4000);
});