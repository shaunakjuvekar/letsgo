'use strict';
import UserProfile from '../models/user_profile.model.js';
import UPTDMM from '../models/user_profile_travel_destination_mapping.model.js';

export function create(req, res) {
    // Extract userId from req.session
    const userId = req.session.userId;
    if (!userId) {
        // If userId is not found in the session, return an error
        res.status(401).json({ error: true, message: 'User not authenticated' });
        return;
    }

    const new_user_profile = new UserProfile({
        ...req.body,
        user_id: userId,
    });

    console.log(new_user_profile)
    const travel_destination_ids = req.body.travel_destination_ids || []; // Get the list of travel destination IDs from req.body

    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        UserProfile.create(new_user_profile, function (err, userProfileId) {
            if (err)
                res.send(err);
            else {
                req.session.userProfileId = userProfileId
                // After creating the user profile, insert data into the mapping table
                const entries = travel_destination_ids.map((travel_destination_id) => {
                    return { userProfileId, travel_destination_id };
                });

                UPTDMM.createMultiple(entries, function (err, result) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({ error: false, message: "UserProfile and mappings added successfully!", data: { userProfileId, mapping_id: result } });
                    }
                });

            }
        });
    }
}

export function findById(req, res) {
    // Extract userProfileId from req.session
    console.log(req.session)
    const userProfileId = req.session.userProfileId;
    if (!userProfileId) {
        console.log("User Profile ID issue")
        // If userProfileId is not found in the session, return an error
        res.status(401).json({ error: true, message: 'User not authenticated. userProfileId not present' });
        return;
    }

    UserProfile.findById(userProfileId, function (err, userProfile) {
        if (err)
            res.send(err);

        if (userProfile === null) {
            res.status(404).send({ error: true, message: 'User profile not found' });
            return;
        }

        UPTDMM.findByUserProfileId(userProfileId, function (err, entries) {
            if (err) {
                res.send(err);
            }
            else {
                const response = userProfile;
                
                // Extract values of "travel_destination_id" and create an array
                const travelDestinationIds = entries.map(entry => entry.travel_destination_id);
                console.log(travelDestinationIds)
                response.travel_destination_ids = travelDestinationIds;
                
                res.json(response);
                
            }
        })
    });
}

export function update(req, res) {
    // Extract userProfileId from req.session
    const userProfileId = req.session.userProfileId;
    if (!userProfileId) {
        // If userProfileId is not found in the session, return an error
        res.status(401).json({ error: true, message: 'User not authenticated. userProfileId not present' });
        return;
    }

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        UserProfile.findById(userProfileId, function (err, userProfile) {
            if (err) {
                res.send(err);
                return;
            }

            if (userProfile === null) {
                res.status(404).send({ error: true, message: 'User profile not found' });
                return;
            }

            UserProfile.update(userProfileId, new UserProfile(req.body), function (err, userProfile) {
                if (err) {
                    res.send(err);
                    return;
                }
                UPTDMM.deleteByUserProfileId(userProfileId, function(err, result) {
                    if (err) {
                        res.send(err);
                        return;
                    }

                    const travel_destination_ids = req.body.travel_destination_ids || [];
                    const entries = travel_destination_ids.map((travel_destination_id) => {
                        return { userProfileId, travel_destination_id };
                    });

                    if (entries.length === 0) {
                        res.json({ error: false, message: "UserProfile and mappings updated successfully!", data: { userProfileId } });
                        return;
                    }

                    UPTDMM.createMultiple(entries, function (err, result) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.json({ error: false, message: "UserProfile and mappings updated successfully!", data: { userProfileId, mapping_id: result } });
                        }
                    });
                })
            })
        })
    }
}

export function getUserProfileById(req, res) {
    const id = req.params.id; // Assuming the ID is passed in the URL as a parameter
    UserProfile.findByUserProfileId(id, function (err, userProfile) {
        if (err) {
            res.status(500).send({
                message: "Error retrieving UserProfile with id " + id
            });
        } else if (!userProfile) {
            res.status(404).send({
                message: "UserProfile not found with id " + id
            });
        } else {
            res.send(userProfile);
        }
    });
}