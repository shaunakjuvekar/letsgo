'use strict';
import dbConn from '../../config/db.config.js';

class Friends{
    constructor(friends){
        this.user_id = friends.user_id;
        this.friend_user_id = friends.friend_user_id;
        

    }

    static create(newGroup, result) {
        dbConn.query("INSERT INTO friends set ?", newGroup, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                // console.log(res.insertId);
                result(null, res);
            }
        });
    }

    static findById(id, result) {
        dbConn.query("select friend_user_id from friends where user_id = ? ", id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {

                result(null, res);
                
            }
        });
    }

    static removeFriend(id1, id2, result) {
        dbConn.query("DELETE FROM friends WHERE user_id = ? AND friend_user_id = ?", [id1, id2], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }
    

}




export default Friends;