'use strict';
import dbConn from './../../config/db.config.js';

class UserProfileEventsMapping {
    constructor(UserProfileEventsMapping) {
        this.user_profile_id = UserProfileEventsMapping.user_profile_id;
        this.events_id = UserProfileEventsMapping.events_id;
    }
    static createUserEvents(newEntry, result) {
        dbConn.query("INSERT INTO user_profile_events_mapping set ?", newEntry, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res.insertId);
            }
        });
    }
    static createMultiple(newEntries, result) {
        console.log("Inserting entries in events mapping table")
        // Prepare an array of new entries
        console.log(newEntries);
        const entries = newEntries.map((entry) => [entry.userProfileId, entry.event_ids]);

        // Use a single SQL INSERT statement to insert multiple entries
        dbConn.query("INSERT INTO user_profile_events_mapping (user_profile_id, event_id) VALUES ?", [entries], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res.insertId);
            }
        });
    }
    static findByUserProfileId(id, result) {
        dbConn.query("Select event_id from user_profile_events_mapping where user_profile_id = ? ", id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    }
    static deleteEntries(profile_id, result) {
        dbConn.query("DELETE FROM user_profile_events_mapping WHERE user_profile_id=?",
            [profile_id], function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                } else {
                    result(null, res);
                }
            });
    }


  
}

export default UserProfileEventsMapping;
