'use strict';
import dbConn from './../../config/db.config.js';

class Report {
    constructor(report) {
        this.reporter_id = report.reporter_id;
        this.reportee_id = report.reportee_id;
        this.description = report.description;
        this.is_addressed = report.is_addressed;
    }
    static findAll(result) {
        dbConn.query("Select * from reports", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    }

    static create(newReport, result) {
        dbConn.query("INSERT INTO reports set ?", newReport, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res.insertId);
            }
        });
    }

    static update(id, report, result) {
        dbConn.query("UPDATE reports SET description=?,is_addressed=? WHERE id = ?",
            [report.description, report.is_addressed, id], function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                } else {
                    result(null, res);
                }
            });
    }


}

export default Report;
