import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import './Chat.css';
import InfoBar from "../InfoBar/InfoBar";

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
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'http://localhost:5000/';
    

    useEffect(() => {

        const {name,room} = queryString.parse(location.search);

        socket = io.connect(ENDPOINT,connectionOptions);
        
        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {
           
          });

          return () => {
              socket.emit('disconnect');
              socket.off();
          }

        

    } , [ENDPOINT, location.search]);

    useEffect( () => {

        //Listen to the message from server/index
        socket.on('message', (message) => {
            //spread messages and add one message on it
            setMessages(messages => [...messages, message]);
        });

        //Run it only when messages array changes
    }, [messages]);

    //function for sending messages
    const sendMessage = (event) => {

        //Prevent the refreshing page default (onclick/onkeypress)
        event.preventDefault();

        if(message) {

            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message , messages);

    return (
        <div className = "outerContainer">
            <div className = "container">
                <InfoBar room = {room}/>
               {/*<input 
                    value = {message} 
                    onChange = {(event) => setMessage(event.target.value)}
                    onKeyPress = {(event) => event.key === 'Enter' ? sendMessage(event) : null } 
               />*/}

            </div>
        </div>
    )
};

export default Chat;



