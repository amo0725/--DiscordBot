const db = require('../utils/database');

const User = class User {
    constructor(userId,serverId,username){
        this.userId = userId;
        this.serverId = serverId;
        this.username = username;
    }

    static Create(userId,serverId,username){
        return db.execute('INSERT INTO user (userId, serverId, username) VALUES (?,?,?)',[userId,serverId,username]);
    }

    static FetchbyuserId(userId, serverId){
        return db.execute('SELECT * FROM user WHERE userId = ? AND serverId = ?',[userId,serverId]);
    }
}

module.exports = User;