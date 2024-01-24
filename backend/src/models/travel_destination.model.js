'use strict';
import dbConn from './../../config/db.config.js';

class TravelDestination {
    constructor(travelDestination) {
        this.name = travelDestination.name;
        this.address = travelDestination.address;
        this.description = travelDestination.description;
    }
    static findAll(result) {
        dbConn.query("Select * from travel_destinations", function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                //console.log('travel_destinations : ', res);
                result(null, res);
            }
        });
    }

    static findLocation(travelId, result) {
        dbConn.query("Select LATITUDE,LONGITUDE from travel_destinations where id=?", travelId,function (err, res) {
            if (err) {
                console.log("error: ", err);
                result( err, null);
            } else {
                //console.log('travel_destinations : ', res);
                result(null, res);
            }
        });
    }

    static findByTravelDestinationId(destinationId, result) {
        dbConn.query(`
            SELECT up.* 
            FROM user_profiles up 
            JOIN user_profile_travel_destination_mapping map ON map.user_profile_id = up.id 
            WHERE map.travel_destination_id = ?`,
            [destinationId],
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                } else {
                    result(null, res);
                }
            });
    }

    static findByUserId(userId, result) {
        dbConn.query(`
            SELECT td.* 
            FROM travel_destinations td
            JOIN user_profile_travel_destination_mapping map ON map.travel_destination_id = td.id
            JOIN user_profiles up ON up.id = map.user_profile_id
            WHERE up.user_id = ?`,
            [userId],
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

    // Add this method to the TravelDestination class in the model file
    static findDestinationsByUserId(userId, result) {
        console.log(`Starting findDestinationsByUserId with userId: ${userId}`);
        dbConn.query(`
        SELECT td.* 
        FROM travel_destinations td
        JOIN user_profile_travel_destination_mapping up_tdm ON td.id = up_tdm.travel_destination_id
        JOIN user_profiles up ON up.id = up_tdm.user_profile_id
        WHERE up.user_id = ?
        `, [userId], (err, res) => {
            if (err) {
                console.log("Error executing findDestinationsByUserId query:", err);
                result(err, null);
                return;
            }

            result(null, res);
        });
    }


}

export default TravelDestination;
