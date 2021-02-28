//Help manage users
const users = [];

//Add user
const addUser = ({ id, name, room}) => {

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if(!name || !room){
        return {error: 'Enter username and room'};
    }

    //check if the user already exist
    const existingUser = users.find((user) => {user.room === room && user.name === name});

    if(existingUser){
        return {error: 'The user name is taken'};
    }

    //Add the user
    const user = { id, name, room };
    users.push(user);

    return { user };

}



//Remove user
const removeUser = (id) => {

    
    const index = users.findIndex((user) => user.id === id);
  
    if(index !== -1) 
        return users.splice(index, 1)[0];
  }

//Get user
const getUser = (id) => users.find((user) => user.id === id);

//Get user in specific room 
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

//export
module.exports = { addUser, removeUser, getUser, getUsersInRoom };