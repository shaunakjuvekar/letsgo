import PropTypes from "prop-types";
import {
  Button,
  ButtonGroup,
  Container,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import APIService from "./APIService";
import { useContext } from "react";
import UserContext from "./UserContext";
import { useNavigate, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const FriendList = ({ data }) => {
  const [userid] = useContext(UserContext);
  const navigate = useNavigate();
  const userID = userid.id;

  const handleDeleteFriend = async (friendId) => {
    const response = await APIService.removeFriend(userID, friendId);

    if (response.error == false) {
      setTimeout(() => {
        navigate("/"); // Replace with the actual home page URL
      }, 2000);
    }
  };

  return (
    <Container>
      <ListGroup>
        {data.map((item) => (
          <ListGroupItem key={item.friend_user_id}>
            <Link to={`/profile/${item.friend_user_id}`}>
              <h4>{item.first_name + " " + item.last_name}</h4>
            </Link>

            <ButtonGroup>
              <LinkContainer to={`/chat/user/${item.friend_user_id}`}>
                <Button type="primary">Message</Button>
              </LinkContainer>
              <Button
                variant="danger"
                onClick={() => handleDeleteFriend(item.friend_user_id)}
              >
                Remove Friend
              </Button>
            </ButtonGroup>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};

FriendList.propTypes = {
  data: PropTypes.array.isRequired, // Add prop type validation for 'data'
};

export default FriendList;
