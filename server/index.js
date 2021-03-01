const express = require('express');
const router = require('./router');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const app = express();
const httpServer = require("http").createServer(app);
const socketio = require('socket.io');
const io = socketio(httpServer);

app.use(router);


io.on('connect', (socket) => {
    socket.on('join', ({ name, room}, callback) =>{

        const {error,user} = addUser({id: socket.id, name, room});

        if(error) callback({error: 'error'});

        //Send message to the user
        socket.emit('message' , {user:'admin', text: `${user.name}, welcome to room ${user.room}`});
        //send message to everyone
        socket.broadcast.to(user.room).emit('message', {user:'admin', text: `${user.name}, has joined to the room`} );

        //connect to the room
        socket.join(user.room);
        
        callback();
    });

    socket.on('sendMessage', (message, callback) => {

        const user = getUser(socket.id);

        io.to(user.room).emit('message', {user: user.name, text: message});

        callback();

    });

    socket.on('disconnect' , () => {
        console.log('User left');
    });
});


httpServer.listen(process.env.PORT || 5000 ,() => console.log('The server has started'));
