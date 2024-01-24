"use strict";
import dbConn from "./../../config/db.config.js";

class User {
  constructor(user) {
    this.email = user.email;
    this.password = user.password;
  }

  static create(newUser) {
    return new Promise((resolve, reject) => {
      dbConn.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
          console.log("error: ", err);
          reject(err);
        } else {
          resolve(res.insertId);
        }
      });
    });
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      dbConn.query(
        "SELECT * FROM users WHERE email = ? ",
        email,
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            reject(err);
          } else {
            resolve(res.length > 0 ? res[0] : null);
          }
        }
      );
    });
  }
}

export default User;
