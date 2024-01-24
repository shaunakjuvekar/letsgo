import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserContext from "./UserContext";
import APIService from "./APIService";
import Logout from "./Logout";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

let checkedLogin = false;

const Header = () => {
  const [userId, setUserId] = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      if (checkedLogin) {
        return;
      }

      try {
        const data = await (await APIService.checkLoginStatus()).json();
        console.info("Logged in as user: ", data.data.id);
        setUserId(data.data.id);
        checkedLogin = true;
      } catch (error) {
        console.log("Not logged in.");
      }
    })();
  }, [userId, setUserId, navigate]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFocus = () => {
    navigate("/search");
  };

  const isActive = (path) => {
    return location.pathname !== "/search" && location.pathname === path;
  };

  useEffect(() => {
    (async () => {
      let response = await APIService.fetchProfile();
      if (response.status === 200) {
        const jsonData = await response.json();
        setProfile(jsonData);
      }
    })();
  }, [userId]);

  return (
    <div>
      <Navbar
        style={{ backgroundColor: "#861F41" }}
        data-bs-theme="dark"
        className="d-flex justify-content-between"
      >
        <Container className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <Nav className="me-auto">
              <Navbar.Brand className="main-logo">LetsGo</Navbar.Brand>
              <LinkContainer to="/">
                <Nav.Link active={isActive("/")}>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/browse">
                <Nav.Link active={isActive("/browse")}>Browse</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/events">
                <Nav.Link active={isActive("/events")}>Events</Nav.Link>
              </LinkContainer>
              {userId ? (
                <>
                  <LinkContainer to="/profile">
                    <Nav.Link active={isActive("/profile")}>Profile</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/group">
                    <Nav.Link active={isActive("/group")}>Groups</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/friends">
                    <Nav.Link active={isActive("/friends")}>Friends</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/chat">
                    <Nav.Link active={isActive("/chat")}>Chat</Nav.Link>
                  </LinkContainer>
                  <Logout />
                  {profile && (
                    <Nav.Item style={{ marginLeft: 50, marginTop: 5 }}>
                      <span
                        style={{
                          color: "white",
                          fontSize: "24px",
                          marginRight: "50px",
                        }}
                      >
                        Welcome {profile.first_name}!
                      </span>
                    </Nav.Item>
                  )}
                </>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link active={isActive("/signup")}>Register</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link active={isActive("/login")}>Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </div>
          {location.pathname !== "/search" &&
            location.pathname !== "/browse" && (
              <div className="ml-auto d-flex align-items-center">
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="Search..."
                    className="mr-sm-2"
                    onChange={handleSearchChange}
                    value={searchTerm}
                    onFocus={handleFocus}
                    style={{ backgroundColor: "white", color: "black" }}
                  />
                  <Button variant="outline-secondary" className="ml-2">
                    <i className="fa fa-search"></i>
                  </Button>
                </InputGroup>
              </div>
            )}
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
