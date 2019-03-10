const PORT = 6024;
const MULTICAST_ADDR = '239.255.255.250';
const LOCAL_IP = '192.168.0.104';
const dgram = require('dgram');
const client = dgram.createSocket('udp4');

client.on('listening', function () {
  let address = client.address();
  console.log('UDP Client listening on ' + address.address + ":" + address.port);
});

client.on('message', function (message, rinfo) {
  console.log('Message from: ' + rinfo.address + ':' + rinfo.port + ' - ' + message);
});

//*** Also tried with client.bind(PORT, LOCAL_IP, ... and failed
client.bind(PORT, function () {
  client.addMembership(MULTICAST_ADDR, LOCAL_IP);
});