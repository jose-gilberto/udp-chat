const udp = require('dgram');
const buffer = require('buffer');

// creating a client socket
const client = udp.createSocket('udp4');

client.on('message',function( msg,info ){
  console.log('Data received from server : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
});

const sendMessage = () => {
  const message = document.getElementById("text-camp").value;
  const now = new Date();

  const messageFormated = `${now.toLocaleString()}|${message}`;
  const data = Buffer.from(messageFormated);

  client.send(data, 41234, 'localhost', (err) => {
    if (err) client.close();
    else console.log("Data send!");
  });
}
