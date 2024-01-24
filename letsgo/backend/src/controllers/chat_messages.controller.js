"use strict";
import ChatMessage from "../models/chat_message.model.js";
import { sendMessageToUsers } from "./chat.socket.js";

export async function createMessage(req, res) {
  if (!req.session.userId) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized access. Please log in.",
    });
  }

  const { message, toId, toType } = req.body;
  if (!message || !toId || !toType) {
    return res.status(400).json({
      error: true,
      message: "Missing required fields (message, toId, toType).",
    });
  }

  if (Number.parseInt(toId) === NaN) {
    return res.status(400).json({
      error: true,
      message: "Invalid toId. Must be a number.",
    });
  }

  const toIdInt = Number.parseInt(toId);

  if (toType !== "user" && toType !== "group") {
    return res.status(400).json({
      error: true,
      message: "Invalid toType. Must be either 'user' or 'group'.",
    });
  }

  const newMessage = new ChatMessage({
    message: message,
    from_user: req.session.userId,
    to_id: toIdInt,
    to_type: toType,
  });

  try {
    const messageId = await ChatMessage.create(newMessage);
    const createdMessage = await ChatMessage.findByIdWithContext(messageId);
    sendMessageToUsers(toIdInt, createdMessage);
    if (toType === "user") {
      // When sending to a user, the sending user also has to be notified
      sendMessageToUsers(req.session.userId, createdMessage);
    }

    res.json({
      error: false,
      message: "Message sent successfully.",
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: "Error sending message.",
      details: err,
    });
  }
}

export async function fetchUserMessageHistory(req, res) {
  const userId = req.params.userId;
  const currentUserId = req.session.userId;

  if (!userId) {
    return res.status(400).json({
      error: true,
      message: "Missing required field userId.",
    });
  }

  if (!currentUserId) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized access. Please log in.",
    });
  }

  try {
    const messages = await ChatMessage.findBetweenUsers(currentUserId, userId);
    res.json({
      error: false,
      messages: messages,
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: "Error fetching message history for user.",
      details: err,
    });
  }
}

export async function fetchGroupMessageHistory(req, res) {
  const groupId = req.params.groupId;
  const currentUserId = req.session.userId;

  if (!groupId) {
    return res.status(400).json({
      error: true,
      message: "Missing required field groupId.",
    });
  }

  if (!currentUserId) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized access. Please log in.",
    });
  }

  try {
    const messages = await ChatMessage.findByGroupId(groupId);
    res.json({
      error: false,
      messages: messages,
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: "Error fetching message history for group.",
      details: err,
    });
  }
}

export async function fetchMostRecentChatPartners(req, res) {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized access. Please log in.",
    });
  }

  try {
    const recentChatPartners = await ChatMessage.fetchMostRecentChatPartners(
      userId
    );
    res.json({
      error: false,
      recentChatPartners: recentChatPartners,
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: "Error fetching most recent chat partners.",
      details: err,
    });
  }
}
