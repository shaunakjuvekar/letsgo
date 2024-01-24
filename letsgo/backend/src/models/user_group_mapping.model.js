'use strict';
import dbConn from '../../config/db.config.js';

class UserGroupMapping{
    constructor(userGroupMapping){
        this.user_id = userGroupMapping.user_id;
        this.group_id = userGroupMapping.group_id;
        

    }

    static create(newGroup, result) {
        dbConn.query("INSERT INTO user_group_mapping set ?", newGroup, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                // console.log(res.insertId);
                result(null, res.insertId);
            }
        });
    }

    static findById(id, result) {
        dbConn.query("select group_id from user_group_mapping where user_id = ? ", id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {

                result(null, res);
                
            }
        });
    }

    static findByGroupId(id, result) {
        dbConn.query("select user_id from user_group_mapping where group_id = ? ", id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {

                result(null, res);
                
            }
        });
    }

    static removeGroup(id1, id2, result) {
        dbConn.query("DELETE FROM user_group_mapping WHERE user_id = ? AND group_id = ?", [id1, id2], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    static removeAllGroup(id1, result) {
        dbConn.query("DELETE FROM user_group_mapping WHERE group_id = ?", id1, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

    static searchUserGroup(id1, id2, result) {
        dbConn.query("SELECT * FROM user_group_mapping WHERE user_id = ? AND group_id = ?", [id1, id2], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }
}



export default UserGroupMapping