import React from "react";
import getRelativeTime from "./getRelativeTime";
import { Col, Row } from "react-bootstrap";

export interface Message {
  id: number;
  message: string;
  from_user_id: number;
  from_user_name: string;
  to_id: number;
  to_type: string;
  created_at: string;
}

interface MessageProps {
  message: Message;
  side: "left" | "right";
}

const MessageBubble: React.FC<MessageProps> = ({ message, side }) => {
  const className = `message__bubble ${
    side === "right"
      ? "float-right bg-primary text-white"
      : "float-left bg-light"
  }`;

  return (
    <Row>
      {side === "right" && <Col></Col>}
      <Col xs={"auto"}>
        <div className={className}>
          <div className="message__header">
            <div className="message__sender">{message.from_user_name}</div>
            <div className="spacer" />
            <div className="message__timestamp">
              {getRelativeTime(message.created_at)}
            </div>
          </div>
          <div className="message__body">{message.message}</div>
        </div>
      </Col>
      {side === "left" && <Col></Col>}
    </Row>
  );
};

export default MessageBubble;
