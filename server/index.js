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
        //send massage to everyone
        socket.broadcast.to(user.room).emit('message', {user:'admin', text: `${user.name}, has joined to room`} );

        //connect to the room
        socket.join(user,room);
        
        callback();
    });

    socket.on('sendMessage', () => {

    });

    socket.on('disconnect' , () => {
        console.log('User left');
    });
});


httpServer.listen(process.env.PORT || 5000 ,() => console.log('The server has started'));
