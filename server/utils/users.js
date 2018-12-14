[{
    id: '1231243',
    name: 'Andrew',
    room: 'The Office Fans'
}]

//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        let user = {
            id,
            name,
            room
        }
        this.users.push(user);
        return user
    }
    removeUser(id) {
        //return user that was removed
        let removedUser = this.users.filter((user, i) => user.id === id)
        this.users = this.users.filter((user) => user.id !== id)
        if(removedUser.name) {
            return `removed user: ${removedUser[0].name}`
        } else {
            return `User did not exist`
        }
    }
    getUser(id) {
        let getUser = this.users.filter((user, i) => user.id === id)
        return getUser[0]
    }
    getUserList(room) {
        let users = this.users.filter((user) =>  user.room === room);
        let namesArray = users.map((user) => user.name);
        return namesArray;
    }
}


module.exports = {Users}

// class User extends Users {
//     constructor(id, name, room){
//         this.id = id;
//         this.name = name;
//         this.room = room;
//     }
//     getUserDescription () {
//         return `socket ${this.id}'s name is ${this.name}`
//     }
// }

// var me = new User(socket.id, params.name, params.room);

// const users = [];

// const addUser = (id, name, room) => {
//     users.push({})
// }

// module.export = {addUser}