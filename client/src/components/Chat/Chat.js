import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

const Chat = (location) => {

    useEffect(() => {

        const {room, name} = queryString.parse(location.search);

        console.log(room);
        console.log(name);
    })
    return (
        <h1>Chat</h1>
    )
};

export default Chat;