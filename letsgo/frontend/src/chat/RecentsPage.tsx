import React from "react";
import { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import APIService from "../APIService";
import getRelativeTime from "./getRelativeTime";
import { LinkContainer } from "react-router-bootstrap";

interface RecentChat {
  chat_with_id: number;
  chat_with_type: "user" | "group";
  chat_with_name: string;
  message: string;
  created_at: string;
}

export default function RecentsPage() {
  const [recents, setRecents] = useState<RecentChat[]>([]);

  useEffect(() => {
    (async () => {
      const response = await APIService.fetchChatRecents();
      console.log(response);
      setRecents(response.recentChatPartners);
    })();
  }, []);

  return (
    <Container>
      <Row className="justify-content-center my-5">
        <Col lg={6}>
          <Card className="shadow">
            <Card.Header>
              <h3>Recent Chats</h3>
            </Card.Header>
            <Card.Body>
              <ListGroup>
                {recents.map((recent) => (
                  <LinkContainer
                    to={`/chat/${recent.chat_with_type}/${recent.chat_with_id}`}
                    key={recent.chat_with_id}
                  >
                    <ListGroup.Item className="recent-chat-item">
                      <>
                        <Row>
                          <Col xs={8}>
                            <h5>{recent.chat_with_name}</h5>
                          </Col>
                          <Col xs={4} className="recent-chat-timestamp">
                            <p>{getRelativeTime(recent.created_at)}</p>
                          </Col>
                        </Row>
                        <Row>
                          <p>{recent.message}</p>
                        </Row>
                      </>
                    </ListGroup.Item>
                  </LinkContainer>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
