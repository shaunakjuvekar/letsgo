/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import APIService from "./APIService";

/**
 * @typedef Profile
 * @type {object}
 * @property {string} id
 * @property{string} first_name
 * @property{string} last_name
 * @property{string} date_of_birth
 * @property{string} address_line_1
 * @property{string} address_line_2
 * @property{string} city
 * @property{string} state
 * @property{string} country
 * @property{string} zip_code
 * @property{string} user_id
 */

const ProfileForm = ({
  onSubmit,
  profile,
  submitText,
  profileCreation,
  profileUpdation,
}) => {
  const actualProfile = profile || {};
  console.log(actualProfile);
  // console.log(profileCreation)
  // console.log(profileUpdation)

  const [availableDestinations, setAvailableDestinations] = useState(null);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [destinationButtonState, setDestinationButtonState]  = useState(false)

  const destinationsMap = {};
  if (availableDestinations !== null) {
    console.log(availableDestinations)
    availableDestinations.forEach((destination) => {
      destinationsMap[destination.id] = destination.name;
    });
  }

  const dateObj = new Date(actualProfile.date_of_birth);

  const day = dateObj.getUTCDate().toString().padStart(2,'0');
  const month = dateObj.getUTCMonth().toString().padStart(2,'0');
  const year = dateObj.getUTCFullYear();

  const formattedDate = `${year}-${month}-${day}`

  const actualSubmitText = submitText || "Submit";

  const handleCheckboxClick = (id) => {
    setSelectedDestinations((prevSelected) => ({
      ...prevSelected,
      [id]: !prevSelected[id],
    }));
    console.log(selectedDestinations);
  };

  const displaySelectedDestinations = (event) => {
    event.preventDefault();
    console.log(selectedDestinations);
    setDestinationButtonState(true)
  };

  let userSelectedDestinationsBE = null;
  if (actualProfile) {
    userSelectedDestinationsBE = actualProfile.travel_destination_ids;
  }

  console.log("BE Travel ID's :", userSelectedDestinationsBE);

  // const [destinationMap, setDestinationMap] = useState({})

  useEffect(() => {
    (async () => {
      let response = await APIService.fetchDestinations();

      if (response.status === 200) {
        const jsonData = await response.json();
        console.log(jsonData);
        setAvailableDestinations(jsonData);
      }
    })();
  }, [actualProfile.travel_destination_ids]);

  // console.log(destinationMap)

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          className="form-field"
          placeholder="Enter First Name"
          name="first_name"
          defaultValue={actualProfile.first_name}
        />
      </Form.Group>

      <Form.Group controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Last Name"
          name="last_name"
          defaultValue={actualProfile.last_name}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDateOfBirth">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          placeholder="Select Date of Birth"
          name="date_of_birth"
          defaultValue={formattedDate}
        />
      </Form.Group>

      <Form.Group controlId="formBasicAddressLine1">
        <Form.Label>Address Line 1</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Address Line 1"
          name="address_line_1"
          defaultValue={actualProfile.address_line_1}
        />
      </Form.Group>

      <Form.Group controlId="formBasicAddressLine2">
        <Form.Label>Address Line 2</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Address Line 2"
          name="address_line_2"
          defaultValue={actualProfile.address_line_2}
        />
      </Form.Group>

      <Form.Group controlId="formBasicCity">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter City"
          name="city"
          defaultValue={actualProfile.city}
        />
      </Form.Group>

      <Form.Group controlId="formBasicState">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter State"
          name="state"
          defaultValue={actualProfile.state}
        />
      </Form.Group>

      <Form.Group controlId="formBasicCountry">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Country"
          name="country"
          defaultValue={actualProfile.country}
        />
      </Form.Group>

      <Form.Group controlId="formBasicZipCode">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Zip Code"
          name="zip_code"
          defaultValue={actualProfile.zip_code}
        />
      </Form.Group>

      {userSelectedDestinationsBE != null ? (
        <div>
          <Form.Label>Selected Travel Destinations</Form.Label>
          <ul>
            {userSelectedDestinationsBE.map((destination) => (
              <li key={destination}>{destinationsMap[destination]}</li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}

      <Form.Group controlId="formBasicTravelDestinations">
        <Form.Label>Travel Destinations</Form.Label>
        {availableDestinations != null ? (
          availableDestinations.map((destination) => (
            <Form.Check
              type="checkbox"
              key={destination.id}
              defaultValue={destination.id}
              id={`destination-checkbox-${destination.id}`}
              label={`${destination.name}`}
              checked={selectedDestinations[destination.id] || false}
              onClick={() => handleCheckboxClick(destination.id)}
            ></Form.Check>
          ))
        ) : (
          <></>
        )}
        {destinationButtonState == false?
           <Button
           variant="secondary"
           type="submit"
           onClick={displaySelectedDestinations}
         >
           Confirm Destinations
         </Button>
         :
         <div style={{
          marginTop: 5,
          backgroundColor: "orange",
          padding: 5,
          width: '50%'
        }}>
          Destinations Saved!
         </div>
      
      }
       
      </Form.Group>

      <Form.Group controlId="submit">
        <Button
          style={{ marginTop: 5, marginBottom: 5 }}
          variant="primary"
          type="submit"
        >
          {actualSubmitText}
        </Button>
      </Form.Group>

      {profileCreation == true ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h4
            style={{
              marginTop: 5,
              backgroundColor: "greenyellow",
              padding: 10,
            }}
          >
            Profile Creation successful!
          </h4>
        </div>
      ) : (
        <></>
      )}

      {profileUpdation == true ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h4
            style={{
              marginTop: 5,
              backgroundColor: "greenyellow",
              padding: 10,
            }}
          >
            Profile Updation successful!
          </h4>
        </div>
      ) : (
        <></>
      )}
    </Form>
  );
};

export default ProfileForm;
