'use strict';
import dbConn from './../../config/db.config.js';

class UserProfile {
    constructor(userProfile) {
        this.first_name = userProfile.first_name;
        this.last_name = userProfile.last_name;
        this.date_of_birth = userProfile.date_of_birth;
        this.address_line_1 = userProfile.address_line_1;
        this.address_line_2 = userProfile.address_line_2;
        this.city = userProfile.city;
        this.state = userProfile.state;
        this.country = userProfile.country;
        this.zip_code = userProfile.zip_code;
        this.user_id = userProfile.user_id;
    }
    static create(newUserProfile, result) {
        dbConn.query("INSERT INTO user_profiles set ?", newUserProfile, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                // console.log(res.insertId);
                result(null, res.insertId);
            }
        });
    }
    static findByUserId(id) {
        return new Promise((resolve, reject) => {
          dbConn.query("Select * from user_profiles where user_id = ?", id, function (err, res) {
            if (err) {
              console.log("error: ", err);
              reject(err);
            } else {
              resolve(res.length > 0 ? res[0] : null);
            }
          });
        });
      }

    static findById(id, result) {
        dbConn.query("select * from user_profiles where id = ? ", id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                if (res.length > 0) {
                    const userProfile = res[0]; // Take the first (and only) result
                    result(null, userProfile);
                } else {
                    // User profile not found
                    result(null, null);
                }
            }
        });
    }


    static findByUserProfileId(id, result) {
        dbConn.query("select * from user_profiles where user_id = ? ", id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                if (res.length > 0) {
                    const userProfile = res[0]; // Take the first (and only) result
                    result(null, userProfile);
                } else {
                    // User profile not found
                    result(null, null);
                }
            }
        });
    }



    static update(id, userProfile, result) {
        dbConn.query("UPDATE user_profiles SET first_name=?,last_name=?,date_of_birth=?,address_line_1=?,address_line_2=?,city=?,state=?,country=?,zip_code=? WHERE id = ?",
            [userProfile.first_name, userProfile.last_name, userProfile.date_of_birth, userProfile.address_line_1,
            userProfile.address_line_2, userProfile.city, userProfile.state, userProfile.country, userProfile.zip_code, id], function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                } else {
                    result(null, res);
                }
            });
    }

    static findMemberNames(id, result) {
        if (!id || !id.length) {
            return result(null, null);
        }
        else {
            dbConn.query("select user_id as friend_user_id,first_name, last_name from user_profiles WHERE user_id IN (?)", [id], function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {

                    result(null, res);

                }
            });
        }
    }

    static findBycreatedID(id, result) {
        // Check if the id is valid
        if (!id) {
            console.log("findBycreatedID was called with a null or undefined 'id' parameter.");
            return result(new Error("Invalid ID parameter"), null);
        }
    
        const query = "SELECT first_name, last_name FROM user_profiles WHERE user_id = ?";
        console.log(`Executing query: ${query} with userId: ${id}`);
    
        dbConn.query(query, id, function (err, res) {
            if (err) {
                console.error("findBycreatedID: Error executing the query.", { query, id, err });
                // Debug additional error information if available
                console.error("SQL State: ", err.sqlState);
                console.error("SQL Message: ", err.sqlMessage);
                return result(err, null);
            }
    
            console.log(`findBycreatedID: Query executed successfully for userId: ${id}`);
    
            if (res.length === 0) {
                console.log(`findBycreatedID: No user profile found for userId: ${id}`);
                // Adding a special debug query to check if the user ID exists in the users table
                const userCheckQuery = "SELECT id FROM users WHERE id = ?";
                dbConn.query(userCheckQuery, id, function(userErr, userRes) {
                    if (userErr) {
                        console.error("Error checking user existence: ", userErr);
                    } else if (userRes.length === 0) {
                        console.log(`Debug: No user found with ID: ${id} in the users table.`);
                    } else {
                        console.log(`Debug: User ID: ${id} exists in the users table, but no profile found.`);
                    }
                });
                return result(null, {});
            }
    
            console.log(`findBycreatedID: User profile retrieved for userId: ${id}`, res);
            result(null, res);
        });
    }
    


    static findBySuggestedUserID(uid, result) {
        dbConn.query("select id from user_profiles where user_id = ? ", uid, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {

                result(null, res);

            }
        });
    }


    static findSuggestedFriendsProfiles(id, result) {
        if (!id || !id.length) {
            return result(null, null);
        }
        else {
            dbConn.query("select id from user_profiles WHERE user_id IN (?)", [id], function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {

                    result(null, res);

                }
            });
        }
    }

    static findSuggestedFriendsProfilesList(userIds, groupIds, result) {
        if ((!userIds || !userIds.length) && (!groupIds || !groupIds.length)) {
            return result(null, null);
        } else {
            dbConn.query("SELECT user_id, first_name, last_name FROM user_profiles WHERE id IN (?) AND id not IN (?) ORDER BY RAND() LIMIT 10", [userIds, groupIds], function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {

                    result(null, res);
                }
            });
        }
    }




}


export default UserProfile;
