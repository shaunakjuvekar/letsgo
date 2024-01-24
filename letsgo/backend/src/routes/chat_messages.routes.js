import express from "express";
import * as chatMessagesController from "../controllers/chat_messages.controller.js";

const router = express.Router();

router.post("/create", chatMessagesController.createMessage);
router.get("/user/:userId", chatMessagesController.fetchUserMessageHistory);
router.get("/group/:groupId", chatMessagesController.fetchGroupMessageHistory);
router.get("/recent", chatMessagesController.fetchMostRecentChatPartners);

export default router;
