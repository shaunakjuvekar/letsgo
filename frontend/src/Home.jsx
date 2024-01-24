import {React, useState, useEffect, useContext } from 'react';
import { Carousel, Card, Button, Row, Col } from 'react-bootstrap';
import APIService from './APIService';
import UserContext from './UserContext';
import Burruss from './assets/burruss.jpeg';
import Moss from './assets/moss.jpeg';
import Torg from './assets/torg.jpeg';
import Mabry from './assets/mabry-mill.jpg';
import { Link } from 'react-router-dom';


const imgStyle = {
  width: 800,
  height: 500
}

const Home = () => {
  const [userId] = useContext(UserContext);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [futureEvents, setFutureEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("userId in fetchEvents: ", userId);
        if (userId) {
          const response = await APIService.fetchGroup(userId);
          const allGroups = await response.json();
          console.log("allGroups")
          console.log(allGroups);
          const ongoing = allGroups.filter(group => new Date(group.trip_start_date) <= new Date() && new Date(group.trip_end_date) >= new Date());
          const future = allGroups.filter(group => new Date(group.trip_start_date) > new Date());
          const past = allGroups.filter(group => new Date(group.trip_end_date) < new Date());
          setOngoingEvents(ongoing);
          setFutureEvents(future);
          setPastEvents(past);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [userId]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
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

  const renderEventCard = (event) => {
    const startDate = new Date(event.trip_start_date).toLocaleDateString();
    const endDate = new Date(event.trip_end_date).toLocaleDateString();
    return (
      <Col xs={12} md={6} lg={4} className="mb-4">
        <Card className="h-100 shadow-sm">
          <Card.Img variant="top" src={event.thumbnail} />
          <Card.Body>
            <Card.Title>{event.group_name}</Card.Title>
            <Card.Text>{event.travel_destination_name}</Card.Text>
            <Link to={`/group/${event.id}`}>
            <Button variant="primary" >View Details</Button></Link>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Start: {startDate}</small> 
            {'   '} 
            <small className="text-muted">End: {endDate}</small>
          </Card.Footer>
        </Card>
      </Col>
    );
  };

  return (
    <div className="home-container">
      <h1 style={{ marginTop: 20 }}>LetsGo - Your Online Travel Coordinator</h1>
      <p>
        LetsGo is a travel social networking site for <span style={{ color: "#861F41" }}>Virginia</span><span style={{ color: "#E5751F" }}> Tech </span>
        students.
      </p>

      {userId ? (
          <>
            <h2 className="mb-3">Happening Now</h2>
            <Row>
              {ongoingEvents.map(renderEventCard)}
            </Row>

            <h2 className="mb-3 mt-5">Upcoming Adventures</h2>
            <Row>
              {futureEvents.map(renderEventCard)}
            </Row>

            <h2 className="mb-3 mt-5">Memories from Past Journeys</h2>
            <Row>
              {pastEvents.map(renderEventCard)}
            </Row>
          </>
      ) : (
        <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
          <Carousel.Item>
            <img style={imgStyle} src={Burruss} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img style={imgStyle} src={Moss} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img style={imgStyle} src={Torg} alt="Third slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img style={imgStyle} src={Mabry} alt="Fourth slide" />
          </Carousel.Item>
        </Carousel>
      )}
    </div>
  );
};

export default Home;
