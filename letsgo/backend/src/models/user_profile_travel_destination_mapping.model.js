"use strict";
import dbConn from "./../../config/db.config.js";

class UserProfileTravelDestinationMapping {
  constructor(userProfileTravelDestinationMapping) {
    this.user_profile_id = userProfileTravelDestinationMapping.user_profile_id;
    this.travel_destination_id =
      userProfileTravelDestinationMapping.travel_destination_id;
  }
  static create(newEntry, result) {
    dbConn.query(
      "INSERT INTO user_profile_travel_destination_mapping set ?",
      newEntry,
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          result(null, res.insertId);
        }
      }
    );
  }
  static createMultiple(newEntries, result) {
    // Prepare an array of new entries
    const entries = newEntries.map((entry) => [
      entry.userProfileId,
      entry.travel_destination_id,
    ]);

    // Use a single SQL INSERT statement to insert multiple entries
    dbConn.query(
      "INSERT INTO user_profile_travel_destination_mapping (user_profile_id, travel_destination_id) VALUES ?",
      [entries],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          result(null, res.insertId);
        }
      }
    );
  }
  static findByUserProfileId(id, result) {
    dbConn.query(
      "Select travel_destination_id from user_profile_travel_destination_mapping where user_profile_id = ? ",
      id,
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          result(null, res);
        }
      }
    );
  }
  static deleteByUserProfileId(id, result) {
    dbConn.query(
      "delete from user_profile_travel_destination_mapping where user_profile_id = ? ",
      id,
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          result(null, res);
        }
      }
    );
  }

  static findRelevantUserProfiles(id, result) {
    if (!id || !id.length) {
      return result(null, null);
    } else {
      dbConn.query(
        "select distinct user_profile_id from user_profile_travel_destination_mapping WHERE travel_destination_id IN (?)",
        [id],
        function (err, res) {
          if (err) {
            console.log("error: ", err);
            result(err, null);
          } else {
            result(null, res);
          }
        }
      );
    }
  }
}

export default UserProfileTravelDestinationMapping;
