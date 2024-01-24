import { io } from "socket.io-client";

const socket = io("http://localhost:5001", {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Connected to socket.io server");
});

socket.onAny((event, ...args) => {
  console.log("New socket.io event:", event, args);
});

export default socket;
