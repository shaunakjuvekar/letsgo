'use strict';
import Events from '../models/events.model.js';
import UPEVMM from '../models/user_profile_events_mapping.model.js';

export function findAll(req, res) {
    console.log("Inside Events controller")
    Events.findAll(function (err, reports) {
        if (err)
            res.send(err);
        res.send(reports);
    });
}

export function createUserEvents(req, res) {
    // Extract userProfileId from req.session
    console.log("inside createUserEvents")
    const userProfileId = req.session.userProfileId;
    console.log("userProfileId: ", userProfileId)
    if (!userProfileId) {
        // If userProfileId is not found in the session, return an error
        res.status(401).json({ error: true, message: 'User Profile not authenticated' });
        return;
    }
    const event_ids = req.body || []; // Get the list of event IDs from req.body

    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {

        // insert data into the mapping table
        const entries = event_ids.map((event_ids) => {
            return { userProfileId, event_ids };
        });

        console.log("mapping event entries: ", entries)

        // Check if entries are already present in the mapping table.
        // If yes, use update query else use create query.

        if (event_ids.length == 0){
            console.log("empty set")
        }
        else{
            UPEVMM.findByUserProfileId(userProfileId, (err, data) => {
                if (err || data==[]) {
                   console.log("No entry exists in events mapping table, creating one...", data)
                   UPEVMM.createMultiple(entries, function (err, result) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.json({ error: false, message: "UserProfile and Events mappings added successfully!", data: { userProfileId, mapping_id: result } });
                            // console.log("user event data: ", data)
                            let finalEvents = []
                            data.map((obj) => {
                                finalEvents.push(obj.event_id)
                            })
                            // console.log("user event array data: ", finalEvents)
                            res.send(finalEvents);
                        }
                    });             
                }
                
                else{
                    console.log("Entry exists in events mapping table, updating...", data)
                    UPEVMM.deleteEntries(userProfileId, function (err, result) {
                        if (err) {
                            res.send(err);
                        } 
                        else {
                            console.log("Deleted user event data, now inserting... ")
                            if (event_ids.length == 0){
                                console.log("empty set`")
                            }
                            else{
                                UPEVMM.createMultiple(entries, function (err, result) {
                                    if (err) {
                                        res.send(err);
                                    } else {
                                        // console.log("user event data: ", data)
                                        let finalEvents = []
                                        data.map((obj) => {
                                            finalEvents.push(obj.event_id)
                                        })
                                        // console.log("user event array data: ", finalEvents)
                                        res.json({ error: false, message: "UserProfile and Events mappings updated successfully!", data: { userProfileId, mapping_id: finalEvents } });
                                    }
                                });          
        
                            }
                          
                        }
                    })
    
                }
                       
            });
    
        }

       
       
    }
}

export const findEventByUserProfileId = (req, res) => {
    
    const userProfileId = req.session.userProfileId;
    UPEVMM.findByUserProfileId(userProfileId, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving travel destinations for the user."
            });
        } else {
            console.log("user event data: ", data)
            let finalEvents = []
            data.map((obj) => {
                finalEvents.push(obj.event_id)
            })
            console.log("user event array data: ", finalEvents)
            res.send(finalEvents);
        }
    });
};



