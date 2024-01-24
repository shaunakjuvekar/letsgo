import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import cors from "cors";
import cookieSession from "cookie-session";

import userRoutes from "./src/routes/user.routes.js";
import userProfileRoutes from "./src/routes/user_profile.routes.js";
import travelDestinationRoutes from "./src/routes/travel_destination.routes.js";
import groupInfoRoutes from "./src/routes/group_info.routes.js";
import friendsRoutes from "./src/routes/friends.routes.js";
import searchRoutes from "./src/routes/search.routes.js";
import chatMessagesRoutes from "./src/routes/chat_messages.routes.js";

import chatSocket from "./src/controllers/chat.socket.js";
import reportRoutes from "./src/routes/report.routes.js";
import eventRoutes from "./src/routes/events.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const sessionMiddleware = cookieSession({
  name: "session",
  keys: ["ce8697e90170e0d8a1c84bf4dae326cb"],

  maxAge: 7 * 24 * 60 * 60 * 1000,
});

app.use(sessionMiddleware);

const port = process.env.PORT || 5001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// using as middleware
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/userProfiles", userProfileRoutes);
app.use("/api/v1/travelDestinations", travelDestinationRoutes);
app.use("/api/v1/groups", groupInfoRoutes);
app.use("/api/v1/friends", friendsRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/chatMessages", chatMessagesRoutes);
app.use("/api/v1/reports", reportRoutes);
app.use("/api/v1/events", eventRoutes);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

chatSocket(io, sessionMiddleware);

io.engine.use(sessionMiddleware);

httpServer.listen(port, () => {
  console.info(`Server running on port ${port}`);
});
