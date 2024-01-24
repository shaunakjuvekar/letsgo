import React, { useCallback, useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import MessageBubble, { Message } from "./MessageBubble";
import APIService from "../APIService";
import UserContext from "../UserContext";
import socket from "./socket";

export function Chat({
  chatWithType,
  chatWithId,
}: {
  chatWithType: "group" | "user";
  chatWithId: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId] = useContext(UserContext);

  const sendMessage = async (message: string) => {
    await APIService.sendMessage(message, chatWithType, chatWithId);
  };

  const fetchMessageHistory = async () => {
    const func =
      chatWithType === "group"
        ? APIService.fetchGroupMessageHistory
        : APIService.fetchUserMessageHistory;
    const messages = await func(chatWithId);
    console.log("Messages:", messages);
    setMessages(messages);
  };

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target: any = e.target;
    const message = target.message.value;
    console.log("Sending message", message);
    await sendMessage(message);
    target.message.value = "";
  };

  const handleNewMessageFromSocket = useCallback((...args: any) => {
    console.log("New message from socket", args);
    const message = args[0];
    setMessages((messages) => [...messages, message]);
  }, []);

  useEffect(() => {
    fetchMessageHistory();

    socket.on("new_message", handleNewMessageFromSocket);

    return () => {
      socket.off("new_message", handleNewMessageFromSocket);
    };
  }, [chatWithType, chatWithId, handleNewMessageFromSocket]);

  return (
    <Container className="chat-container">
      <Row>
        <Col>
          <div className="chat__messages">
            <div>
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  side={userId === message.from_user_id ? "right" : "left"}
                />
              ))}
            </div>
          </div>
          <Form className="chat__input" onSubmit={handleMessageSubmit}>
            <InputGroup>
              <Form.Control
                id="message"
                type="text"
                placeholder="Type a message"
              />
              <Button type="submit" variant="primary">
                Send
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
