"use strict";

import { createConnection } from "mysql2";
//local mysql db connection
const dbConn = createConnection({
  host: "127.0.0.1",
  user: "test",
  password: "pass123",
  database: "letsgo",
});

dbConn.connect(function (err) {
  if (err) throw err;
  console.info("Database Connected!");
});

export default dbConn;
