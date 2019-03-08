var PORT = 8088;
var HOST = '192.168.0.104';
var dgram = require('dgram');
var client = dgram.createSocket('udp4');

client.on('listening', function () {
    var address = client.address();
    console.log('UDP Client listening on ' + address.address + ":" + address.port);
    client.setBroadcast(true)
    client.setMulticastTTL(128); 
    client.addMembership('230.185.192.108', HOST);
});

client.on('message', function (message, remote) {   
    console.log('A: Epic Command Received. Preparing Relay.');
    console.log('B: From: ' + remote.address + ':' + remote.port +' - ' + message);
});

client.bind(PORT, HOST);

const sendMessage = () => {
  /*
  const message = document.getElementById("text-camp").value;
  const now = new Date();

  const messageFormated = `${now.toLocaleString()}|${message}`;
  const data = Buffer.from(messageFormated);

  client.send(data, 41234, 'localhost', (err) => {
    if (err) client.close();
    else console.log("Data send!");
  });*/
}
