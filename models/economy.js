const db = require('../utils/database');

const Economy = class Economy {
    constructor(id,uid,coins,bank,storage){
        this.id = id;
        this.uid = uid;
        this.coins = coins;
        this.bank = bank;
        this.storage = storage;
    }

    static Create(uid){
        return db.execute('INSERT INTO economy (uid) VALUES (?)',[uid]);
    }

    static FetchbyuserId(userId,serverId){
        return db.execute('SELECT * FROM economy LEFT JOIN user ON economy.uid = user.uid WHERE userId = ? AND serverId = ?',[userId,serverId]);
    }

    static Dailycoin(uid){
        return db.execute('UPDATE economy SET coins = coins + 800 WHERE uid = ?',[uid]);
    }

    static Increasecoin(uid, x){
        return db.execute('UPDATE economy SET coins = coins + ? WHERE uid = ?',[x,uid]);
    }

    static Decreasecoin(uid, x){
        return db.execute('UPDATE economy SET coins = coins - ? WHERE uid = ?',[x,uid]);
    }

    static Increasebank(uid, x){
        return db.execute('UPDATE economy SET bank = bank + ? WHERE uid = ?',[x,uid]);
    }

    static Decreasebank(uid, x){
        return db.execute('UPDATE economy SET bank = bank - ? WHERE uid = ?',[x,uid]);
    }

    static Updatestorage(uid, storage){
        return db.execute('UPDATE economy SET storage = ? WHERE uid = ?',[storage,uid]);
    }
}

module.exports = Economy;