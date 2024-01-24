import PropTypes from 'prop-types';
import { useState } from 'react';
import APIService from './APIService';
import { Container, Row, Col, Button, Alert, ListGroup,ListGroupItem,ButtonGroup } from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom';



const SuggestedFriendList = ({ data }) => {
  // Create a mapping of group_name to image URLs

  const [friendId, setFriendId] = useState(false);
  const navigate = useNavigate(); 
  

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // Three items per row
    gap: '50px', // Adjust the gap between items as needed
    marginTop: '50px',
  };

  const itemStyle = {
    border: '1px solid #ccc', // Add a border
    padding: '20px', // Add some padding
    height: 'auto', // Set the height
    width: 'auto', // Set the width
    backgroundColor: '#75787b', // Set the background color
  };


 

  const handleAddFriend = async (friendId) => {
    
      // Define the data you want to send in the POST request
      const data = { friend_user_id: friendId }; // Replace 'friendId' with the actual ID

      const response = await APIService.createFriend(data);

      if(response.error ==false){

        setFriendId(true);

        setTimeout(() => {
        navigate("/"); // Replace with the actual home page URL
      }, 2000);

      }
     
  };

  return (
    <Container>
    <ListGroup>
      {data.map((item) => (
        <ListGroupItem key={item.id}>
          <Link to={`/profile/${item.user_id}`}>
            <h4>{item.first_name + " " + item.last_name}</h4>
          </Link>

          <ButtonGroup>
            
            <Button
              variant="primary"
              onClick={() => handleAddFriend(item.user_id)}
            >
              Add Friend
            </Button>
          </ButtonGroup>
        </ListGroupItem>
      ))}
    </ListGroup>
    {friendId === true ? (
        <Row>
          <Col>
            <Alert variant="success" className="text-center mt-3">
              Friend is added successfully!
            </Alert>
          </Col>
        </Row>
      ) : null}
  </Container>
      
  );
};

SuggestedFriendList.propTypes = {
  data: PropTypes.array.isRequired, // Add prop type validation for 'data'
};

export default SuggestedFriendList;
