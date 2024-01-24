import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
} from "react-bootstrap";
import ApiService from "./APIService";
import Burruss from "./assets/burruss.jpeg";
import Moss from "./assets/moss.jpeg";
import Torg from "./assets/torg.jpeg";
import Mabry from "./assets/mabry-mill.jpg";
import Map from "./Map";

function DestinationDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(location.state.destination);
  const [usersInterested, setUsersInterested] = useState([]);
  const placeholderImageUrl =
    "https://via.placeholder.com/50/808080/FFFFFF?text=User";
  const [destLocation, setDestLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    if (destination) {
      async function fetchUsersInterested() {
        const fetchedUsers = await ApiService.fetchUsersByDestination(
          destination.id
        );
        setUsersInterested(fetchedUsers);
      }

      fetchUsersInterested();
    }
  }, [destination]);

  useEffect(() => {
    console.log("useEffect is running"); // Add this line for debugging

    (async () => {
      try {
        let response = await ApiService.fetchTravelInfo(destination.id);

        if (response.ok) {
          const jsonData = await response.json();
          console.log("I am Successfully here. The data is " + jsonData);
          setDestLocation(jsonData);
        } else {
          console.log("API response not okay. Status:", response.status);
        }
      } catch (error) {
        console.error("Error while fetching travel info:", error);
      }
    })();
  }, []);

  if (!destination) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <Button
            variant="outline-primary"
            onClick={() => window.history.back()}
          >
            Back to List
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h1>{destination.name}</h1>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={8}>
          {/* Replace with actual image path if needed */}
          <Image src={Burruss} alt={destination.name} fluid />
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Body>
              <Card.Title>Description</Card.Title>
              <Card.Text>{destination.description}</Card.Text>
              <Card.Title>Address</Card.Title>
              <Card.Text>{destination.address}</Card.Text>
            </Card.Body>
          </Card>

          <h5 style={{ marginTop: "15px" }}>Location</h5>

          <ListGroup>
            <Map data={destLocation}></Map>
          </ListGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Users Interested</h2>
          <ListGroup>
            {usersInterested.map((user, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/profile/${user.user_id}`)}
              >
                <div>{`${user.first_name} ${user.last_name}`}</div>
                <Image
                  src={placeholderImageUrl}
                  alt={`${user.first_name} ${user.last_name}`}
                  roundedCircle
                  style={{ width: "50px", height: "50px" }}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default DestinationDetail;
