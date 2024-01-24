'use strict';
import dbConn from '../../config/db.config.js';

class GroupInfo {
    
    constructor(groupInfo){
        this.group_name = groupInfo.group_name;
        this.travel_destination_name = groupInfo.travel_destination_name;
        this.created_user_id = groupInfo.created_user_id;
        this.trip_start_date = groupInfo.trip_start_date;
        this.trip_end_date = groupInfo.trip_end_date;
    }

    static create(newGroup, result) {
        dbConn.query("INSERT INTO group_info set ?", newGroup, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                // console.log(res.insertId);
                result(null, res.insertId);
            }
        });
    }

    static findByGroupName(groupname, result) {
        dbConn.query("Select * from group_info where group_name = ? ", groupname, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {

                result(null, res);
                
            }
        });
    }

    static findByDestinationName(destinationname, result) {
        dbConn.query("Select * from group_info where travel_destination_name = ? ", destinationname, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {

                result(null, res);
                
            }
        });
    }

    static findCreatedUser(groupname, result) {
        dbConn.query("select * from group_info where id = ? ", groupname, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log(res)
                result(null, res);
                
            }
        });
    }

    static findById(id, result) {
        if(!id || !id.length) {
            return result(null, null); 
          }
        else{
        dbConn.query("select * from group_info WHERE id IN (?)", [id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log(res)
                result(null, res);
                
            }
        });}
    }

    static deleteCreatedUser(createdUser,groupID, result) {
        dbConn.query("DELETE from group_info where created_user_id = ? and id=?", [createdUser,groupID], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log(res)
                result(null, res);
                
            }
        });
    }

    static findByUserID(userId, result) {
        const query = `
            SELECT DISTINCT gi.* 
            FROM letsgo.group_info gi
            LEFT JOIN letsgo.user_group_mapping ugm ON gi.id = ugm.group_id
            WHERE gi.created_user_id = ? OR ugm.user_id = ?;
        `;
    
        dbConn.query(query, [userId, userId], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    };
    

}

export default GroupInfo;