import { Container, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import { useEffect, useState } from "react";
import { useContext } from "react";
import APIService from "./APIService";
import UserContext from "./UserContext";

export default function Profile() {
  const [userid] = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [createProfileSuccess, setProfileCreationSuccess] = useState(false)
  const [updateProfileSuccess, setUpdateProfileSuccess] = useState(false)
  

  // console.log(userid)

  useEffect(() => {
    (async () => {
      let response = await APIService.fetchProfile();
      console.log(response)
      if (response.status === 200) {
        const jsonData = await response.json();
        console.log(jsonData)
        setProfile(jsonData);
      }
    })();
  },[userid]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = {};
    const form = event.target;
    console.log(form)

    for (const input of form.elements) {
      console.log(input)
      if (input.tagName === 'INPUT' || input.tagName === 'SELECT') {
        formData[input.name] = input.value;
      }
      if (input.tagName === 'BUTTON'){
        formData['action'] = input.innerHTML;
      }
    }

    const {
      first_name,
      last_name,
      date_of_birth,
      address_line_1,
      address_line_2,
      city,
      state,
      country,
      zip_code,
      action
    } = formData;

    // Getting all the checkboxes within the form
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    console.log(checkboxes)

    const selectedDestinations = [];

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        
        const destinationId = checkbox.value;
        selectedDestinations.push(destinationId);
      }
    });

    // Log the selected destinations
    console.log('Selected Destinations:', selectedDestinations);

    let profileObj = {
      first_name : first_name,
      last_name : last_name,
      date_of_birth : date_of_birth,
      address_line_1 : address_line_1,
      address_line_2 : address_line_2,
      city : city,
      state : state,
      country : country,
      zip_code : zip_code,
      travel_destination_ids: selectedDestinations,
    }

    console.log(profileObj)

    if (action=='Update'){
      const createProfileResponse = await APIService.updateProfile(profileObj, userid);
      console.log(createProfileResponse)
      if (createProfileResponse.error == false){
        console.log("setting Update Profile Success to true")
        setUpdateProfileSuccess(true)
      }
    }
    else{
      const createProfileResponse = await APIService.createProfile(profileObj);
      console.log(createProfileResponse)
      if (createProfileResponse.error == false){
        console.log("setting Profile Success to true")
        setProfileCreationSuccess(true)
      }
      
    }
    
  };

  if (!userid) {
    // return <Navigate to="/login" />;
  }

  return (
    <Container className='profile-container'>
      <Row>
        <h1 >Your Profile</h1>
      </Row>
      {profile === null?
      <div>
        <Row style={{marginLeft: -1}}>You currently do not have a profile. Create one below:</Row>
      <Row>
        <ProfileForm
          onSubmit={handleFormSubmit}
          submitText="Create"
          profile={profile}
          profileCreation = {createProfileSuccess}
          profileUpdation = {updateProfileSuccess}
        />
        </Row>
      </div>
        :<>
       <Row style={{marginLeft: -1}}>Edit your profile below:</Row>
          <ProfileForm
          onSubmit={handleFormSubmit}
          submitText="Update"
          profile={profile}
          profileCreation = {createProfileSuccess}
          profileUpdation = {updateProfileSuccess}
      />
      </>
        }
    </Container>
  );
}
