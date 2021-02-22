const express = require('express');
const router = require('./router');

const app = express();
const httpServer = require("http").createServer(app);
const socketio = require('socket.io');
const io = socketio(httpServer);

io.on('connect', (socket) =>{
    console.log('New connaction');

    socket.on('disconnect' , () => {
        console.log('User left');
    });
});

app.use(router);

httpServer.listen(
    process.env.PORT || 5000 ,
    () => console.log('The server has started'));