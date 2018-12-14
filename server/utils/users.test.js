const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },{
            id: '2',
            name: 'Jen',
            room: 'React Course'
        },{
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }];
    });

    it('should add new user', () => {
        let testUsers = new Users();
        let user = {
            id: '123',
            name: 'John',
            room: 'The Office Fans'
        }
        let resUser = testUsers.addUser(user.id, user.name, user.room)
        expect(testUsers.users.length).toBe(1)
        expect(testUsers.users).toEqual([user])
    })
    it('should remove a user', () => {
        let user1 = users.users[0]
        let user2 = users.users[1]
        let user3 = users.users[2]
        let removeUser = users.removeUser(user1.id)
        expect(users.users).toEqual([user2, user3])
        expect(users.users.length).toBe(2)
    })
    it('should NOT remove a user', () => {
        let user1 = users.users[0]
        let user2 = users.users[1]
        let user3 = users.users[2]
        let removeUser = users.removeUser('123')
        expect(users.users).toEqual([user1, user2, user3])
    })
    it('should find the user', () => {
        let user1 = users.users[0]
        let user2 = users.users[1]
        let user3 = users.users[2]
        let getUser = users.getUser(user1.id)
        expect(getUser).toEqual(user1)
    })
    it('should NOT find the user', () => {
        let getUser = users.getUser('123')
        expect(getUser).toEqual(undefined)
        // expect(getUser).toNotExist();
    })
    it('should return names for node course room', () => {
        let resUser = users.getUserList('Node Course');
        expect(resUser).toEqual(['Mike', 'Julie'])
    })
    it('should return names for react course room', () => {
        let resUser = users.getUserList('React Course');
        expect(resUser).toEqual(['Jen'])
    })
})