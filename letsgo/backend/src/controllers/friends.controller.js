"use strict";
import Friends from "../models/friends.model.js";
import UserProfile from "../models/user_profile.model.js";
import UserProfileTravelDestinationMapping from "../models/user_profile_travel_destination_mapping.model.js";
import GroupInfo from "../models/group_info.model.js";

export function findById(req, res) {
  const userId = req.session.userId;

  if (!userId) {
    return res
      .status(401)
      .json({ error: true, message: "User not authenticated" });
  }

  Friends.findById(userId, function (err, groupIDs) {
    if (err) res.send(err);
    else if (!groupIDs || !groupIDs.length) {
      res.status(404).send({ error: true, message: "You dont have friends" });
      return;
    } else {
      const friend_ids = groupIDs;

      const friendID = friend_ids.map((group) => group.friend_user_id);

      UserProfile.findMemberNames(friendID, function (err, entries) {
        if (err) {
          res.send(err);
        } else {
          res.json(entries);
        }
      });
    }
  });
}

export function findbySuggestedId(req, res) {
  const userId = req.session.userId;

  if (!userId) {
    return res
      .status(401)
      .json({ error: true, message: "User not authenticated" });
  }

 Friends.findById(userId, function (err, groupIDs) {
 if (err) res.send(err);
  else {
   const friend_ids = groupIDs;
  let friendID = friend_ids.map((group) => group.friend_user_id);
  friendID.push(userId);

  UserProfile.findBySuggestedUserID(userId, function (err, userProfileID) {
    if (err) res.send(err);
         else {
           const userProfile = userProfileID[0].id;
           UserProfile.findSuggestedFriendsProfiles(
             friendID,
             function (err, userProfileValue) {
               if (err) res.send(err);
               else {
                 const UserProfileLists = userProfileValue;
                 const UserProfileArray = UserProfileLists.map(
                   (group) => group.id
                 );
                 UserProfileTravelDestinationMapping.findByUserProfileId(
                   userProfile,
                   function (err, destinationDetails) {
                     if (err) res.send(err);
                     else {
                       const Destinations = destinationDetails;
                       const destinationArray = Destinations.map(
                         (group) => group.travel_destination_id
                       );
                       UserProfileTravelDestinationMapping.findRelevantUserProfiles(
                         destinationArray,
                         function (err, RelevantProfiles) {
                           if (err) res.send(err);
                           else if (!RelevantProfiles || !RelevantProfiles.length) {
                            res.status(404).send({ error: true, message: "You dont have friend suggestions" });
                            return;
                          }
                           else {
                             const RProfiles = RelevantProfiles;
                             const RprofileArray = RelevantProfiles.map(
                               (group) => group.user_profile_id
                             );

                             UserProfile.findSuggestedFriendsProfilesList(
                               RprofileArray,
                               UserProfileArray,
                               function (err, finalValues) {
                                 if (err) res.send(err);
                                 else if (finalValues === null) {
                                   res
                                     .status(404)
                                     .send({
                                       error: true,
                                       message: "No Suggestions as of Now",
                                     });
                                   return;
                                 } else {
                                   const finalResults = finalValues;

                                   res.json(finalResults);
                                 }
                               }
                             );
                           }
                         }
                       );
                     }
                   }
                 );
               }
             }
           );
         }
       });
   }
   });
}

export function create(req, res) {
  const userId = req.session.userId;

  if (!userId) {
    return res
      .status(401)
      .json({ error: true, message: "User not authenticated" });
  }

  const newGroup = new GroupInfo(req.body);

  const friend = new Friends({
    user_id: userId,
    ...req.body,
  });

  Friends.create(friend, (err, FriendID) => {
    if (err) res.send(err);

    return res.json({
      error: false,
      message: "Friend Added Successfully!",
      data: {
        FriendID,
      },
    });
  });
}

export function deleteFriendship(req, res) {
  const { userId, friendId } = req.params;
  Friends.removeFriend(userId, friendId, (err, result) => {
    if (err) {
       //Handle the error and send an error response
      console.error("Error deleting friendship:", err);
      res
        .status(500)
        .json({ error: true, message: "Failed to delete friendship" });
    } else {
       //Handle successful deletion and send a success response
      res
        .status(200)
        .json({ error: false, message: "Friendship deleted successfully" });
    }
  });
}
