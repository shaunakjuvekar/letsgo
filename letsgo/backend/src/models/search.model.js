"use strict";
import dbConn from "../../config/db.config.js";

class Search {
  static searchDestinations(query, result) {
    dbConn.query(
      `SELECT id, name, description, address
             FROM travel_destinations
             WHERE name LIKE CONCAT('%', ? ,'%') OR description LIKE CONCAT('%', ? ,'%')`,
      [query, query],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          const response = {
            count: res.length,
            data: res,
          };
          console.log("Search Destinations Results:", response);
          result(null, response);
        }
      }
    );
  }

  static searchGroups(query, result) {
    dbConn.query(
      `SELECT id, group_name, travel_destination_name
             FROM group_info
             WHERE group_name LIKE CONCAT('%', ? ,'%') OR travel_destination_name LIKE CONCAT('%', ? ,'%')`,
      [query, query],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          const response = {
            count: res.length,
            data: res,
          };
          // console.log("Search Groups Results:", response);
          result(null, response);
        }
      }
    );
  }

  static searchUsers(query, result) {
    dbConn.query(
      `SELECT users.id, email, first_name, last_name, date_of_birth, address_line_1, address_line_2, city, state, country, zip_code
             FROM users
             JOIN user_profiles ON users.id = user_profiles.user_id
             WHERE first_name LIKE CONCAT('%', ? ,'%') OR last_name LIKE CONCAT('%', ? ,'%')`,
      [query, query],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          const response = {
            count: res.length,
            data: res,
          };
          console.log("Search Users Results:", response);
          result(null, response);
        }
      }
    );
  }
}

export default Search;
