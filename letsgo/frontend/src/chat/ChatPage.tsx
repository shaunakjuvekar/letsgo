import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Chat } from "./Chat";
import { LinkContainer } from "react-router-bootstrap";

export default function ChatPage() {
  const { chatType, chatId } = useParams<{
    chatType: "user" | "group";
    chatId: string;
  }>();

  console.log(chatType, chatId);

  return (
    <Container>
      <Row className="justify-content-center my-5">
        <Col lg={6}>
          <Card className="shadow">
            <Card.Header>
              <LinkContainer to="/chat">
                <Button type="button" variant="secondary">
                  Back to Recent Chats{" "}
                </Button>
              </LinkContainer>
            </Card.Header>
            <Card.Body>
              <Card.Title>Chat</Card.Title>
              <Chat chatWithType={chatType!} chatWithId={chatId!} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
