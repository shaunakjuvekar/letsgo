import { useState, useContext } from "react";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Form, Button } from "react-bootstrap";
import APIService from "./APIService";
import { Navigate } from "react-router-dom";

const CreateGroup = () => {
  const [userid] = useContext(UserContext);
  const [group, setGroupCreated] = useState(false);
  const navigate = useNavigate(); // Get the navigate function
  const [error, setError] = useState('');

  console.log("The Create Group USerID " + userid)

  if (!userid) {
    // return <Navigate to="/login" />;
  }
  

  const FormHandler = async (event) => {
    event.preventDefault();
    setError(''); // Clear any existing errors

    let group_name = event.target.group_name.value;
    let travel_destination_name = event.target.travel_destination_name.value.toUpperCase();
    let trip_start_date = new Date(event.target.trip_start_date.value);
    let trip_end_date = new Date(event.target.trip_end_date.value);
    let created_user_id = userid.id;

    // Format dates to 'YYYY-MM-DD' format for MySQL
    let formattedStartDate = trip_start_date.toISOString().split('T')[0];
    let formattedEndDate = trip_end_date.toISOString().split('T')[0];

    // write console.log to print every singgle value abov
    console.log("The group name is " + group_name)
    console.log("The travel destination name is " + travel_destination_name)
    console.log("The trip start date is " + trip_start_date)
    console.log("The trip end date is " + trip_end_date)
    console.log("The created user id is " + created_user_id)
    console.log("The created user id is " + userid)

    if (trip_end_date < trip_start_date) {
      setError('End date cannot be before start date.');
      return;
    }
    
    if (!group_name || !travel_destination_name || !trip_start_date || !trip_end_date) {
      return;
    }
    
    let body = { 
      group_name, 
      trip_end_date, 
      trip_start_date, 
      created_user_id,
      travel_destination_name, 
      trip_end_date: formattedEndDate, 
      trip_start_date: formattedStartDate, 
    };
  
    try {
      if (userid) {
        const response = await APIService.createGroup(body);
        console.log(response);
        setGroupCreated(true);

        // Update the group list after a delay
        setTimeout(async () => {
          try {
            let response = await APIService.fetchGroupById(userid);
            if (response.status === 200) {
              const jsonData = await response.json();
              setGroupCreated(jsonData);
            }
          } catch (error) {
            console.error("Error fetching group:", error);
          }
        }, 1000);

        // Redirect to home or another route
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };


  return (
    <div style={{ textAlign: "center", marginTop: "150px" }}>
      <h1 style={{ marginBottom: "60px" }}>Create a New Group</h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form style={{ border: "2px solid black", padding: "20px" }} onSubmit={FormHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Group Name</Form.Label>
            <Form.Control type="text" name="group_name" id="group_name" placeholder="Enter group name" style={{ width: "400px", marginBottom: "50px", border: "2px solid black" }} required />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>Travel Destination Name</Form.Label>
            <Form.Control type="text" name="travel_destination_name" id="travel_destination_name" placeholder="Enter travel destination name" style={{ width: "400px",  border: "2px solid black" }} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Trip Start Date</Form.Label>
            <Form.Control type="date" name="trip_start_date" style={{ width: "400px", marginBottom: "20px", border: "2px solid black" }} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Trip End Date</Form.Label>
            <Form.Control type="date" name="trip_end_date" style={{ width: "400px", marginBottom: "20px", border: "2px solid black" }} required />
          </Form.Group>

          {error && (
            <div style={{ color: 'red', marginBottom: '15px' }}>
              {error}
            </div>
          )}

          <Button type="submit" style={{ marginTop: "20px", backgroundColor: "#E5751F", border:"none" }}>
          <span style={{color:"black"}}>Create Group</span>
          </Button>

          {group == true?
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <h6 style={{marginTop: 5, backgroundColor: 'greenyellow',color:"black",padding: 5}}>Group is successfully created!</h6>
        </div>
        :<></>
      }
        </Form>
      </div>
    </div>
  );
};

export default CreateGroup;
