import UserGroupMapping from "../models/user_group_mapping.model.js";

let ioCache;

const chatSocket = (io, session) => {
  ioCache = io;

  io.on("connection", (socket) => {
    let userId = null;
    let cookieString = socket.request.headers.cookie;
    if (!cookieString) {
      socket.disconnect();
      return;
    }

    let req = {
      connection: { encrypted: false },
      headers: { cookie: cookieString },
    };
    let res = { getHeader: () => {}, setHeader: () => {} };

    session(req, res, () => {
      userId = req.session.userId;
    });

    if (!userId) {
      socket.disconnect();
      return;
    }

    if (userId) {
      socket.join(userId);

      UserGroupMapping.findById(userId, function (err, groupIDs) {
        if (err) {
          console.error(err);
        } else {
          const groups = groupIDs;
          const groupIds = groups.map((group) => group.group_id);
          for (const groupId of groupIds) {
            socket.join(groupId);
          }
        }
      });
    }
  });
};

export const sendMessageToUsers = (roomId, message) => {
  ioCache.to(roomId).emit("new_message", message);
};

export default chatSocket;
