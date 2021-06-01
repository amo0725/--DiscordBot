const db = require('../utils/database');

const Timeout = class Timeout {
    constructor(uid,command_name,timeout){
        this.uid= uid;
        this.command_name = command_name;
        this.timeout = timeout;
    }

    static Checktimeout(uid,command_name){
        return db.execute('SELECT * FROM timeout WHERE uid = ? AND command_name = ?',[uid,command_name]);
    }

    static Settimeout(uid,command_name,timeout){
        return db.execute('INSERT INTO timeout (uid,command_name,timeout) VALUES (?,?,?)',[uid,command_name,timeout]);
    }

    static Removetimeout(uid,command_name){
        return db.execute('DELETE FROM timeout WHERE uid = ? AND command_name = ?',[uid,command_name]);
    }
}

module.exports = Timeout;