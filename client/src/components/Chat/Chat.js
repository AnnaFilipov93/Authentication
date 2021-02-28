import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";


let socket;

const connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};

const Chat = ({location}) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'http://localhost:5000/';
    

    useEffect(() => {

        const {name,room} = queryString.parse(location.search);

       // socket = io(ENDPOINT);
        socket = io.connect(ENDPOINT,connectionOptions);
        
        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {
           
          });

          return () => {
              socket.emit('disconnect');
              socket.off();
          }

        

    } , [ENDPOINT,location.search]);

    return (
        <h1>Chat</h1>
    )
};

export default Chat;



