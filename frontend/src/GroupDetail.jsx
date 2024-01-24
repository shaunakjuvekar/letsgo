import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import APIService from "./APIService";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const GroupDetail = () => {
  const { groupId } = useParams();
  const [userid] = useContext(UserContext);
  const [group, setGroup] = useState(null);
  const [error, setError] = useState(null);
  const [userGroup, setUserGroup] = useState(null);
  const [successMessage, setsuccessMessage] = useState(false);
  const navigate = useNavigate();
  const shareUrl = "https://letsgo.com"; // Updated share URL

  // Formatting the group details into a shareable text string
  const shareText = group
    ? `
    Hey! Check out this group I found on LetsGo:

    Group Name: ${group.group_name}
    Destination: ${group.destination}
    Administrator: ${group.administrator}
    Trip Start Date: ${new Date(group.trip_start_date).toLocaleDateString()}
    Trip End Date: ${new Date(group.trip_end_date).toLocaleDateString()}
    Members: ${group.members.join(", ")}

  `
    : "";

  useEffect(() => {
    (async () => {
      try {
        let jsonData = await APIService.fetchGroupDetails(groupId);

        // Checking if the API returned an array or string, and normalizing the data or setting an error message
        if (Array.isArray(jsonData) && jsonData.length === 0) {
          setError("Group details are empty.");
        } else if (typeof jsonData === "string") {
          setError("Invalid data format received from the server.");
        } else if (!jsonData || Object.keys(jsonData).length === 0) {
          setError("Group details not found.");
        } else {
          console.log("this");
          console.log(jsonData);
          setGroup(jsonData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching group details.");
      }
    })();
  }, [groupId]);

  useEffect(() => {
    (async () => {
      try {
        let jsonData = await APIService.fetchGroupUserInfo(groupId);

        // Checking if the API returned an array or string, and normalizing the data or setting an error message
        if (jsonData.error) {
          setUserGroup(null);
        } else {
          setUserGroup(jsonData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching group details.");
      }
    })();
  }, [groupId]);

  if (!userid) {
    return <Navigate to="/login" />;
  }

  if (error) {
    return (
      <div style={{ marginTop: "50px", textAlign: "center" }}>
        <h1>Error:</h1>
        <p>{error}</p>
        <Link to="/browse">
          <Button type="button" variant="primary">
            Go Back
          </Button>
        </Link>
      </div>
    );
  }

  if (group === null) {
    return <div>Loading...</div>;
  }

  const handleAddGroup = async () => {
    let body = { groupId };
    const response = await APIService.addToGroup(body);

    if (response.error == false) {
      setsuccessMessage(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  function handleShareClick() {
    if (navigator.share) {
      navigator
        .share({
          title: "Group Details",
          text: "Great trip",
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Web Share not supported on this browser");
    }
  }

  const handleDeleteGroup = async () => {
    const response = await APIService.removeGroup(groupId);

    if (response.error == false) {
      setTimeout(() => {
        navigate("/"); // Replace with the actual home page URL
      }, 2000);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center my-5">
        <Col lg={6}>
          <Card className="shadow">
          
            <Card.Header
              as="h1"
              className="bg-white font-weight-bold d-flex justify-content-between align-items-center"
            >
              <span>Group Details</span>
              {userGroup !== null ? (
              <ButtonGroup>
                <Link to={`/chat/group/${groupId}`}>
                  <Button variant="primary" className="me-1">
                    Chat
                  </Button>
                </Link>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <i className="fa fa-share-alt" aria-hidden="true"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      target="_blank"
                    >
                      <i
                        className="fa fa-facebook-official"
                        aria-hidden="true"
                      ></i>{" "}
                      Facebook
                    </Dropdown.Item>
                    <Dropdown.Item
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        shareText
                      )}&url=${shareUrl}`}
                      target="_blank"
                    >
                      <i className="fa fa-twitter" aria-hidden="true"></i>{" "}
                      Twitter
                    </Dropdown.Item>
                    <Dropdown.Item
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        shareText
                      )}%20-%20${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                    >
                      <i className="fa fa-whatsapp" aria-hidden="true"></i>{" "}
                      WhatsApp
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>): (
                <></>
              )}
            </Card.Header>
            <Card.Body>
              <Card.Title className="mb-4 font-weight-bold">
                Group Name: {group.group_name}
              </Card.Title>
              <Card.Title className="mb-4 font-weight-bold ">
                Destination: {group.destination}
              </Card.Title>
              <Card.Text className="mb-4">
                <span className="font-weight-bold">Administrator:</span>{" "}
                {group.administrator}
              </Card.Text>
              <Card.Text className="mb-4">
                <span className="font-weight-bold">Trip Start Date:</span>
                {new Date(group.trip_start_date).toLocaleDateString()}
              </Card.Text>
              <Card.Text className="mb-4">
                <span className="font-weight-bold">Trip End Date:</span>
                {new Date(group.trip_end_date).toLocaleDateString()}
              </Card.Text>
              <Card.Text className="mb-3 font-weight-bold">Members:</Card.Text>
              <ListGroup variant="flush">
                {group.members &&
                  group.members.map((member, index) => (
                    <ListGroup.Item key={index}>{member}</ListGroup.Item>
                  ))}
              </ListGroup>
              {userGroup === null || userGroup.length === 0 ? (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => handleAddGroup()}
                >
                  Join Group
                </Button>
              ) : (
                // Your else block content goes here
                <Button
                variant="danger"
                size="lg"
              onClick={() => handleDeleteGroup()}
            >
              <span style={{ color: "black" }}>Remove Group</span>
            </Button>
              )}


              {successMessage === true ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <h6
                    style={{
                      marginTop: 5,
                      backgroundColor: "greenyellow",
                      color: "black",
                      padding: 5,
                    }}
                  >
                    You are now added to the Group!
                  </h6>
                </div>
              ) : (
                <></>
              )}
            </Card.Body>
            <Card.Footer className="bg-white">
              <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                Back
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GroupDetail;
