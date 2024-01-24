"use strict";
import dbConn from "../../config/db.config.js";

class ChatMessage {
  constructor(message) {
    this.message = message.message;
    this.from_user = message.from_user;
    this.to_id = message.to_id;
    this.to_type = message.to_type;
  }

  static create(newMessage) {
    return new Promise((resolve, reject) => {
      dbConn.query(
        "INSERT INTO chat_messages SET ?",
        newMessage,
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            reject(err);
          } else {
            resolve(res.insertId);
          }
        }
      );
    });
  }

  static findByIdWithContext(messageId) {
    const query = `
      SELECT cm.id, cm.message, cm.from_user AS from_user_id,
             COALESCE(up.first_name, u.email) AS from_user_name,
             cm.to_id, cm.to_type, cm.created_at
      FROM letsgo.chat_messages cm
      JOIN letsgo.users u ON cm.from_user = u.id
      LEFT JOIN letsgo.user_profiles up ON u.id = up.user_id
      WHERE cm.id = ?
      `;

    return new Promise((resolve, reject) => {
      dbConn.query(query, messageId, (err, res) => {
        if (err) {
          console.log("error: ", err);
          reject(err);
        } else {
          if (res.length) {
            resolve(res[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  static findBetweenUsers(firstUserId, secondUserId) {
    const query = `
      SELECT cm.id, cm.message, cm.from_user AS from_user_id,
             COALESCE(up.first_name, u.email) AS from_user_name,
             cm.to_id, cm.to_type, cm.created_at
      FROM letsgo.chat_messages cm
      JOIN letsgo.users u ON cm.from_user = u.id
      LEFT JOIN letsgo.user_profiles up ON u.id = up.user_id
      WHERE cm.to_type = 'user'
      AND ((cm.from_user = ? AND cm.to_id = ?) OR (cm.from_user = ? AND cm.to_id = ?))
      ORDER BY cm.created_at ASC
    `;

    return new Promise((resolve, reject) => {
      dbConn.query(
        query,
        [firstUserId, secondUserId, secondUserId, firstUserId],
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  }

  static findByGroupId(groupId) {
    const query = `
      SELECT cm.id, cm.message, cm.from_user AS from_user_id,
             COALESCE(up.first_name, u.email) AS from_user_name,
             cm.to_id, cm.to_type, cm.created_at
      FROM letsgo.chat_messages cm
      JOIN letsgo.users u ON cm.from_user = u.id
      LEFT JOIN letsgo.user_profiles up ON u.id = up.user_id
      WHERE cm.to_type = 'group' AND cm.to_id = ?
    `;

    return new Promise((resolve, reject) => {
      dbConn.query(query, groupId, (err, res) => {
        if (err) {
          console.log("error: ", err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  static fetchMostRecentChatPartners(userId) {
    //   const query = `
    //   SELECT
    //       o.chat_with_id,
    //       o.chat_with_type,
    //       o.last_message_id,
    //       o.chat_with_name,
    //       cm.message,
    //       cm.created_at
    //   FROM ((
    //       SELECT
    //           chat_with_id,
    //           chat_with_type,
    //           MAX(last_message_id) AS last_message_id,
    //           chat_with_name
    //       FROM
    //       ((
    //           SELECT
    //               cm.from_user AS chat_with_id,
    //               'user' AS chat_with_type,
    //               MAX(cm.id) AS last_message_id,
    //               COALESCE(up.first_name, u.email) AS chat_with_name
    //           FROM
    //               letsgo.chat_messages cm
    //           JOIN
    //               letsgo.users u ON cm.from_user = u.id
    //           LEFT JOIN
    //               letsgo.user_profiles up ON u.id = up.user_id
    //           WHERE
    //               cm.to_id = ? AND cm.to_type = 'user'
    //           GROUP BY
    //               cm.from_user
    //       )
    //       UNION
    //       (
    //         SELECT
    //             cm.to_id AS chat_with_id,
    //             'user' AS chat_with_type,
    //             MAX(cm.id) AS last_message_id,
    //             COALESCE(up.first_name, u.email) AS chat_with_name
    //         FROM
    //             letsgo.chat_messages cm
    //         JOIN
    //             letsgo.users u ON cm.to_id = u.id
    //         LEFT JOIN
    //             letsgo.user_profiles up ON u.id = up.user_id
    //         WHERE
    //             cm.from_user = ? AND cm.to_type = 'user'
    //         GROUP BY
    //             cm.to_id
    //       )) AS user_messages
    //       GROUP BY chat_with_id, chat_with_type, chat_with_name
    //       )
    //       UNION
    //       (
    //           SELECT
    //               g.id AS chat_with_id,
    //               'group' AS chat_with_type,
    //               MAX(cm.id) AS last_message_id,
    //               g.group_name AS chat_with_name
    //           FROM
    //               letsgo.chat_messages cm
    //           JOIN
    //               letsgo.user_group_mapping ugm ON cm.to_id = ugm.group_id AND cm.to_type = 'group'
    //           JOIN
    //               letsgo.group_info g ON ugm.group_id = g.id
    //           WHERE
    //               ugm.user_id = ?
    //           GROUP BY
    //               g.id
    //       )
    //       ORDER BY last_message_id DESC
    //   ) AS o
    //   JOIN letsgo.chat_messages cm ON o.last_message_id = cm.id;
    // `;
    const query = `
    WITH UserMessages AS (
      SELECT
          cm.from_user AS chat_with_id,
          MAX(cm.id) AS last_message_id,
          COALESCE(up.first_name, u.email) AS chat_with_name
      FROM
          letsgo.chat_messages cm
      JOIN
          letsgo.users u ON cm.from_user = u.id
      LEFT JOIN
          letsgo.user_profiles up ON u.id = up.user_id
      WHERE
          cm.to_id = ? AND cm.to_type = 'user'
      GROUP BY
          cm.from_user, COALESCE(up.first_name, u.email)

      UNION

      SELECT
          cm.to_id AS chat_with_id,
          MAX(cm.id) AS last_message_id,
          COALESCE(up.first_name, u.email) AS chat_with_name
      FROM
          letsgo.chat_messages cm
      JOIN
          letsgo.users u ON cm.to_id = u.id
      LEFT JOIN
          letsgo.user_profiles up ON u.id = up.user_id
      WHERE
          cm.from_user = ? AND cm.to_type = 'user'
      GROUP BY
          cm.to_id, COALESCE(up.first_name, u.email)
  ),
  GroupMessages AS (
      SELECT
          g.id AS chat_with_id,
          'group' AS chat_with_type,
          MAX(cm.id) AS last_message_id,
          g.group_name AS chat_with_name
      FROM
          letsgo.chat_messages cm
      JOIN
          letsgo.user_group_mapping ugm ON cm.to_id = ugm.group_id AND cm.to_type = 'group'
      JOIN
          letsgo.group_info g ON ugm.group_id = g.id
      WHERE
          ugm.user_id = ?
      GROUP BY
          g.id, g.group_name
  )
  SELECT
      o.chat_with_id,
      o.chat_with_type,
      o.last_message_id,
      o.chat_with_name,
      cm.message,
      cm.created_at
  FROM
      (
          (SELECT
              chat_with_id,
              'user' AS chat_with_type,
              MAX(last_message_id) AS last_message_id,
              chat_with_name
          FROM UserMessages
          GROUP BY chat_with_id, chat_with_name)
          UNION
          SELECT *
          FROM GroupMessages
      ) AS o
  JOIN
      letsgo.chat_messages cm ON o.last_message_id = cm.id
  ORDER BY
      o.last_message_id DESC;
  `;

    return new Promise((resolve, reject) => {
      dbConn.query(query, [userId, userId, userId, userId], (err, res) => {
        if (err) {
          console.log("error: ", err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

export default ChatMessage;
