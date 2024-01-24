"use strict";
import GroupInfo from "../models/group_info.model.js";
import UserGroupMapping from "../models/user_group_mapping.model.js";
import UserProfile from "../models/user_profile.model.js";

export function findByUserID(req, res) {
  GroupInfo.findByUserID(req.params.userId, function (err, groupInfo) {
    if (err) res.send(err);
    res.json(groupInfo);
  });
}
export function create(req, res) {
  const userId = req.session.userId;

  // if(!userId) {
  //   return res.status(401).json({ error: true, message: 'User not authenticated' });
  // }

  const newGroup = new GroupInfo(req.body);

  GroupInfo.create(newGroup, (err, groupInfo) => {
    if (err) return res.send(err);

    UserGroupMapping.create(
      {
        user_id: userId,
        group_id: groupInfo,
      },
      (err, mapping) => {
        if (err) return res.send(err);
        return res.json({
          error: false,
          message: "Group created Successfully!",
          data: {
            groupInfo,
          },
        });
      }
    );
  });
}

export function createGroup(req, res) {
  const userId = req.session.userId;
  const groupID = req.body.groupId;

  UserGroupMapping.create(
    {
      user_id: userId,
      group_id: groupID,
    },
    (err, mapping) => {
      if (err) return res.send(err);
      console.log(groupID);
      return res.json({
        error: false,
        message: "User Group created Successfully!",
        data: {
          groupID,
        },
      });
    }
  );
}

export function findByIdGet(req, res) {
  // Extract userId from the URL parameter
  const userId = req.params.id;

  // You can add authentication and error handling as needed
  // if (!userId) {
  //   return res.status(400).json({ error: true, message: 'User ID is required' });
  // }

  UserGroupMapping.findById(userId, function (err, groupIDs) {
    if (err) {
      res.status(500).send(err);
      return;
    }

    if (groupIDs === null) {
      res
        .status(404)
        .send({ error: true, message: "No Group Found for the given user ID" });
      return;
    }

    const groupID = groupIDs.map((group) => group.group_id);

    GroupInfo.findById(groupID, function (err, entries) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(entries);
      }
    });
  });
}

export function findById(req, res) {
  // Extract userProfileId from req.session
  const userId = req.session.userId;

  // if(!userId) {
  //   return res.status(401).json({ error: true, message: 'User not authenticated' });
  // }

  UserGroupMapping.findById(userId, function (err, groupIDs) {
    if (err) res.send(err);

    if (groupIDs === null) {
      res.status(404).send({ error: true, message: "No Group Found" });
      return;
    }

    const groups = groupIDs;

    const groupID = groups.map((group) => group.group_id);

    GroupInfo.findById(groupID, function (err, entries) {
      if (err) {
        res.send(err);
      } else {
        res.json(entries);
      }
    });
  });
}

export function findByGroupDetail(req, res) {
  const groupId = req.params.groupId;
  console.log(
    `Received request to find group details for group ID: ${groupId}`
  );

  // Find basic group info first
  GroupInfo.findCreatedUser(groupId, function (err, groupInfo) {
    if (err) {
      console.error("Error finding group info:", err);
      return res
        .status(500)
        .send({ error: true, message: "Error fetching group info" });
    }

    if (!groupInfo || groupInfo.length === 0) {
      console.log("No group info found with group ID:", groupId);
      return res
        .status(404)
        .send({ error: true, message: "Group Info Not Found" });
    }

    // If group info is found, proceed to find group members
    UserGroupMapping.findByGroupId(groupId, function (err, groupIDs) {
      if (err) {
        console.error("Error finding group by ID:", err);
      } else if (groupIDs.length > 0) {
        const memberIDs = groupIDs.map((group) => group.user_id);
        UserProfile.findMemberNames(memberIDs, function (err, members) {
          if (err) {
            console.error("Error finding member names:", err);
          } else if (members && members.length > 0) {
            groupInfo[0].members = members.map(
              (member) => `${member.first_name} ${member.last_name}`
            );
            console.log(
              `Mapped member entries to names:`,
              groupInfo[0].members
            );
          } else {
            console.log("No members found for the provided IDs:", memberIDs);
            groupInfo[0].members = [];
          }
        });
      } else {
        groupInfo[0].members = [];
      }

      // Check for admin details regardless of whether members were found
      const creatorUserId = groupInfo[0].created_user_id;
      UserProfile.findBycreatedID(creatorUserId, function (err, adminProfile) {
        if (err) {
          console.error("Error finding admin profile:", err);
        } else if (adminProfile && adminProfile.length > 0) {
          groupInfo[0].administrator = `${adminProfile[0].first_name} ${adminProfile[0].last_name}`;
          console.log(`Admin found: ${groupInfo[0].administrator}`);
        } else {
          console.log("Admin profile not found for user ID:", creatorUserId);
          // Admin not found, so log it and set a default message
          groupInfo[0].administrator = `Admin profile not available for user ID: ${creatorUserId}`;
        }

        // Now construct and send the response
        let response = {
          group_name: groupInfo[0].group_name,
          destination: groupInfo[0].travel_destination_name,
          members: groupInfo[0].members || [], // Ensure members is an array even if empty
          administrator: groupInfo[0].administrator, // Use the message set above
          trip_start_date: groupInfo[0].trip_start_date, // Add this line
          trip_end_date: groupInfo[0].trip_end_date,
        };

        res.json(response);
      });
    });
  });
}

export function findByUserGroupDetail(req, res) {
  const groupId = req.params.groupId;
  const userId = req.session.userId;
  UserGroupMapping.searchUserGroup(userId, groupId, function (err, groupIDs) {
    if (err) {
      console.error("Error finding user group mapping:", err);
      return res
        .status(500)
        .send({ error: true, message: "Error fetching group info" });
    }

    if (!groupIDs || groupIDs.length === 0) {
      console.log("User is not part of the group:", groupId);
      return res
        .status(404)
        .send({ error: true, message: "User is not a part of group" });
    } else {
      console.log("I am receiving this info " + groupId);
      res.json(groupId);
    }
  });
}

export function deleteGroup(req, res) {
  const groupId = req.params.groupId;

  console.log("The group_ID " + groupId);

  const userID = req.session.userId;

  console.log("The user ID here is " + userID);

  // if(!userID) {
  //   return res.status(401).json({ error: true, message: 'User not authenticated' });
  // }

  GroupInfo.findCreatedUser(groupId, function (err, usercreated) {
    if (err) {
      // Handle the error and send an error response
      console.error("Error deleting group:", err);
      res.status(500).json({ error: true, message: "Failed to delete Group" });
    } else {
      const c_uid = usercreated[0].created_user_id;
      console.log("created User " + c_uid);

      if (c_uid === userID) {
        console.log("Hey I created the group");

        UserGroupMapping.removeAllGroup(groupId, (err, result) => {
          if (err) {
            // Handle the error and send an error response
            console.error("Error deleting group:", err);
            res
              .status(500)
              .json({ error: true, message: "Failed to delete Group" });
          } else {
            GroupInfo.deleteCreatedUser(
              userID,
              groupId,
              function (err, usercreated) {
                if (err) {
                  // Handle the error and send an error response
                  console.error("Error deleting group:", err);
                  res
                    .status(500)
                    .json({ error: true, message: "Failed to delete Group" });
                } else {
                  res.status(200).json({
                    error: false,
                    message: "Group deleted successfully",
                  });
                }
              }
            );
          }
        });
      } else {
        UserGroupMapping.removeGroup(userID, groupId, (err, result) => {
          if (err) {
            // Handle the error and send an error response
            console.error("Error deleting friendship:", err);
            res
              .status(500)
              .json({ error: true, message: "Failed to delete Group" });
          } else {
            // Handle successful deletion and send a success response
            res
              .status(200)
              .json({ error: false, message: "Group deleted successfully" });
          }
        });
      }
    }
  });
}
