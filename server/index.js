const express = require('express');

const app = express();
const httpServer = require("http").createServer(app);
const socketio = require('socket.io');
const io = socketio(httpServer);

httpServer.listen(
    process.env.PORT || 5000 ,
    () => console.log('The server has started'));