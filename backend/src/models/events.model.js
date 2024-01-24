'use strict';
import dbConn from './../../config/db.config.js';

class Events {
    constructor(event) {
        this.event_name = event.event_name;
        this.event_description = event.event_description;
        this.event_date = event.event_date;
        this.event_address = event.event_address;
        this.LATITUDE = event.LATITUDE;
        this.LONGITUDE = event.LONGITUDE;

    }
    static findAll(result) {
        dbConn.query("Select * from events", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
    }
    
}

export default Events;
