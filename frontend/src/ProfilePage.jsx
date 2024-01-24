import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
  Button,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import ApiService from "./APIService";

function ProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [interestedDestinations, setInterestedDestinations] = useState([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportDescription, setReportDescription] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const placeholderImageUrl =
    "https://via.placeholder.com/50/808080/FFFFFF?text=User";
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const userData = await ApiService.getUserProfileById(userId);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error according to your application's needs
      }
    }

    async function fetchUserDestinations() {
      try {
        const destinationsData = await ApiService.getTravelDestinationsByUserId(
          userId
        );
        setInterestedDestinations(destinationsData);
      } catch (error) {
        console.error("Error fetching destinations data:", error);
        // Handle the error according to your application's needs
      }
    }

    fetchUserProfile();
    fetchUserDestinations();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  function handleDestinationClick(destination) {
    navigate("/destination-detail", { state: { destination } });
  }
  const handleReportClick = () => {
    setShowReportModal(true);
  };

  const handleCloseReportModal = () => {
    setShowReportModal(false);
    setReportDescription("");
  };
  const handleReportSubmit = async () => {
    try {
      const reportBody = {
        reportee_id: user.id,
        description: reportDescription,
        is_addressed: false,
      };
      await ApiService.createReport(reportBody);

      setShowConfirmation(true);

      // Close the report modal after a delay
      setTimeout(() => {
        handleCloseReportModal();
        setShowConfirmation(false);
      }, 2000); // 2000 milliseconds (2 seconds) delay
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col lg={4}>
          {/* Replace with actual path to user profile images or a placeholder */}
          <Image
            src={placeholderImageUrl}
            alt={`${user.first_name} ${user.last_name}`}
            roundedCircle
            style={{ width: "100px", height: "100px" }}
          />
        </Col>
        <Col lg={8}>
          <h1>{`${user.first_name} ${user.last_name}`}</h1>
          {/* Add more user details as needed */}
          <p>{`Date of Birth: ${new Date(
            user.date_of_birth
          ).toLocaleDateString()}`}</p>
          <p>{`Address: ${user.address_line_1}`}</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={4}>
          <Button variant="danger" onClick={handleReportClick}>
            Report User
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Interested Destinations</h2>
          <ListGroup>
            {interestedDestinations.map((destination, index) => (
              <ListGroup.Item
                key={index}
                onClick={() => handleDestinationClick(destination)}
                style={{ cursor: "pointer" }}
              >
                <Card>
                  <Card.Body>
                    <Card.Title>{destination.name}</Card.Title>
                    <Card.Text>{destination.description}</Card.Text>
                    {/* Add a link to the destination details if needed */}
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      {/* Modal for Reporting User */}
      <Modal show={showReportModal} onHide={handleCloseReportModal}>
        <Modal.Header closeButton>
          <Modal.Title>Report User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showConfirmation ? (
            // Display success message
            <Alert variant="success">Report submitted successfully!</Alert>
          ) : (
            // Display form
            <Form>
              <Form.Group controlId="reportDescription">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          {showConfirmation ? null : ( // No buttons when showing the confirmation message
            <>
              <Button variant="secondary" onClick={handleCloseReportModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleReportSubmit}>
                OK
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProfilePage;
