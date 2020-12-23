const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
let server = http.createServer(app);

const port = process.env.PORT || 2400;
const pathPublic = path.resolve(__dirname, '../public');

app.use(express.static(pathPublic));
module.exports.io = socketIO(server);

require('./socket/socket');

server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Escuchando el puerto ${ port }`);
});