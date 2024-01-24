import { useEffect, useState } from "react";
import APIService from "./APIService";
import { Nav, Container, Card, Button } from 'react-bootstrap';

const Events = () => {

    const [events, setEvents] = useState([]);
    const [activeTab, setActiveTab] = useState('allEvents');
    const [userSelectedEvents, setUserEvents] = useState([]);
    const [toggleStates, setToggleStates] = useState(Array.from(new Array(events.length).fill(false))) 

    // console.log(toggleStates)
    
    useEffect(() => {
        (async () => {
            let response = await APIService.fetchEvents();
            if (response.status === 200) {
                const jsonData = await response.json();
                // console.log(jsonData)
                setEvents(jsonData)
                setToggleStates(Array.from(new Array(jsonData.length).fill(false)))
            }
        })();
    }, []);

      
    useEffect(() => {
        (async () => {
            let response = await APIService.fetchUserEvents();
            if (response.status === 200) {
                const arrData = await response.json();
                // console.log(arrData)
                let apiUserEvents = []
                events.map((val, index) => {
                    if (arrData.includes(val.id)){
                        apiUserEvents.push(val)
                    }
                })
                // console.log(apiUserEvents)
                setUserEvents(apiUserEvents)
            }
        })();
    }, [events]);


    function formatDate(inputDate) {
        const date = new Date(inputDate);
        
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
    
        return formattedDate;
    }

    const clickHandler = (event, index) => {
        
        // console.log('Clicked event:', event);
        // Toggling the state for the clicked Card
        const newToggleStates = [...toggleStates];
        newToggleStates[index] = !newToggleStates[index];
        setToggleStates(newToggleStates);
        
    };

    const submitHandler = async () => {
        console.log("Submit events")
        let userEvents = []
        let userEventIds = []
        toggleStates.map((val, index) => {
            if (val == true){
                userEvents.push(events[index]);
                userEventIds.push(events[index].id)
            }
        })
        setUserEvents(userEvents)
        // console.log(userEvents)
        let createResponse = await APIService.addUserEvents(userEventIds);
        console.log(createResponse)
    }

    return (
        <Container fluid>
               <h1 style={{textAlign: 'center', marginBottom: 20, marginTop: 10}}>View Events</h1>    
                <style>
                    {`
            .nav-custom.nav-link.active {
                background-color: #007bff; /* or any color of your choice */
                color: white; /* Text color when the tab is selected */
            }
        `}
            </style>

            <Nav variant="tabs" defaultActiveKey="allEvents">
                <Nav.Item style={{ flex: 1 }}>
                    <Nav.Link className="nav-custom" eventKey="allEvents" onClick={() => setActiveTab('allEvents')}>Upcoming Events</Nav.Link>

                </Nav.Item>
                <Nav.Item style={{ flex: 1 }}>
                    <Nav.Link className="nav-custom" eventKey="yourEvents" onClick={() => setActiveTab('yourEvents')}>Your Events</Nav.Link>

                </Nav.Item>
            </Nav>

      
        <div className="tab-content" style={{ borderTop: '1px solid #dee2e6' }}>
            <div className={activeTab === 'allEvents' ? 'tab-pane active' : 'tab-pane'} id="allEvents">

                        {
                    events.map((e, index) => {
                        return (
                            <Card  border='secondary' style={{ width: '50%', marginTop: '2rem', marginBottom: '1rem' }} key={e.id}>
                                <Card.Body>
                                    <Card.Title>{e.event_name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{e.event_address}</Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">Date: {formatDate(e.event_date)}</Card.Subtitle>
                                    <Card.Text>
                                        {e.event_description}
                                    </Card.Text>
                                    <Button
                                        variant={toggleStates[index] ? "secondary" : "primary"}
                                        onClick={() => clickHandler(e, index)}
                                    >
                                        {toggleStates[index] ? "Remove from list" : "Add to list"}
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    })
                }
                <Button
                    variant="danger"
                    onClick={() => submitHandler()}  style = {{ marginBottom: 20, marginLeft: 15}}>
                    Submit
                   
                </Button>
            
            </div>

            <div className={activeTab === 'yourEvents' ? 'tab-pane active' : 'tab-pane'} id="yourEvents">
            {
                    userSelectedEvents.length>0 ? userSelectedEvents.map((e, index) => {
                        return (
                            <Card  border='secondary' style={{ width: '50%', marginTop: '2rem', marginBottom: '1rem', alignItems: 'right' }} key={e.id}>
                                <Card.Body>
                                    <Card.Title>{e.event_name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{e.event_address}</Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">Date: {formatDate(e.event_date)}</Card.Subtitle>
                                    <Card.Text>
                                        {e.event_description}
                                    </Card.Text>
                                    {/* <Button
                                        variant={toggleStates[index] ? "secondary" : "primary"}
                                        onClick={() => clickHandler(e, index)}
                                    >
                                        {toggleStates[index] ? "Remove from list" : "Add to list"}
                                    </Button> */}
                                </Card.Body>
                            </Card>
                        );
                    })
                    :
                    <div style={{ textAlign:'center', marginTop: '10rem'}}>
                        <h2>Your events list is empty</h2>
                        <h3>Add a few events to your list from the Upcoming Events!</h3>
                    </div>
                    
                }
            </div>
        </div>


      

        </Container>
      
    );
};

export default Events;
