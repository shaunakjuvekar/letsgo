'use strict';
import TravelDestination from '../models/travel_destination.model.js';

export function findAll(req, res) {
    TravelDestination.findAll(function (err, travelDestination) {
        if (err)
            res.send(err);
        res.send(travelDestination);
    });
}

export function findByTravelDestinationId(req, res) {
    const { destinationId } = req.params;

    TravelDestination.findByTravelDestinationId(destinationId, function (err, profiles) {
        if (err) {
            console.error("error: ", err);
            res.status(500).send(err);
        } else {
            res.json(profiles);
        }
    });
}

export const findDestinationsByUserId = (req, res) => {
    
    const userId = req.params.id; // or req.params.userId based on your route setup
    TravelDestination.findDestinationsByUserId(userId, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving travel destinations for the user."
            });
        } else {
            console.log(data)
            res.send(data);
        }
    });
};

export const findLocation = (req, res) => {
    
    const travelID = req.params.travelId; // or req.params.userId based on your route setup
    TravelDestination.findLocation(travelID, (err, data) => {

        if (err) {
            res.send(err);
        } else {
            let response = {
                latitude: data[0].LATITUDE,
                longitude: data[0].LONGITUDE}
            
            console.log("The location is "+response.longitude)
            res.json(response);
        }



    });
};


