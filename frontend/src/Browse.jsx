import React, { useState, useEffect } from 'react';
import { Tab, Nav, InputGroup, FormControl, Container, Row, Col, ListGroup, Dropdown, Button } from 'react-bootstrap';
import ApiService from './APIService';
import { useNavigate } from 'react-router-dom';


function Browse() {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [destinations, setDestinations] = useState([]);
    const [groups, setGroups] = useState([]);
    const [activeTab, setActiveTab] = useState('destinations');
    const [filteredDestinations, setFilteredDestinations] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const fetchedDestinations = await ApiService.fetchAllDestinations();
            const fetchedGroups = await ApiService.fetchAllGroups();
            setDestinations(fetchedDestinations);
            setGroups(fetchedGroups);
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (searchValue) {
            const lowercasedFilter = searchValue.toLowerCase();
            const filteredDestinations = destinations.filter((destination) => {
                return destination.name.toLowerCase().includes(lowercasedFilter) ||
                    destination.description.toLowerCase().includes(lowercasedFilter);
            });
            const filteredGroups = groups.filter((group) => {
                return group.group_name.toLowerCase().includes(lowercasedFilter) ||
                    group.travel_destination_name.toLowerCase().includes(lowercasedFilter);
            });

            setFilteredDestinations(filteredDestinations);
            setFilteredGroups(filteredGroups);
        } else {
            // If the search value is empty, show all destinations and groups
            setFilteredDestinations(destinations);
            setFilteredGroups(groups);
        }
    }, [searchValue, destinations, groups]);

    const handleViewDestination = (destination) => {
        navigate('/destination-detail', { state: { destination } });
    };

    const handleViewGroup = (groupId) => {
        navigate(`/group/${groupId}`);
    };

    const handleAddClick = () => {
        if (activeTab === 'destinations') {
            navigate('/destinations/create'); // Replace with your actual route for creating a destination
        } else {
            navigate('/group/createGroup');
        }
    };

    return (
        <Container fluid>
            <style>
                {`
        .nav-custom.nav-link.active {
            background-color: #007bff; /* or any color of your choice */
            color: white; /* Text color when the tab is selected */
        }
    `}
            </style>

            <Row className="mb-3">
                <Col>
                    <InputGroup>
                        <FormControl
                            placeholder="Search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </InputGroup>
                </Col>
             
            </Row>

            <Row className="mb-3">
                <Col>
                    <Button variant="outline-primary" onClick={handleAddClick}>
                        Add new {activeTab === 'destinations' ? 'Destination' : 'Group'}
                    </Button>

                </Col>
            </Row>

            <Nav variant="tabs" defaultActiveKey="destinations">
                <Nav.Item style={{ flex: 1 }}>
                    <Nav.Link className="nav-custom" eventKey="destinations" onClick={() => setActiveTab('destinations')}>Destinations</Nav.Link>

                </Nav.Item>
                <Nav.Item style={{ flex: 1 }}>
                    <Nav.Link className="nav-custom" eventKey="groups" onClick={() => setActiveTab('groups')}>Groups</Nav.Link>

                </Nav.Item>
            </Nav>

            <div className="tab-content" style={{ borderTop: '1px solid #dee2e6' }}>
                <div className={activeTab === 'destinations' ? 'tab-pane active' : 'tab-pane'} id="destinations">
                    <ListGroup>
                        {filteredDestinations.map((destination, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                <span>{destination.name} - {destination.description}</span>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleViewDestination(destination)}>
                                    View Destination
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
                <div className={activeTab === 'groups' ? 'tab-pane active' : 'tab-pane'} id="groups">
                    <ListGroup>
                        {filteredGroups.map((group, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                <span>{group.group_name} - {group.travel_destination_name}</span>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleViewGroup(group.id)}> {/* Make sure group has an id property */}
                                    View Group
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            </div>
        </Container>
    );
}

export default Browse;





   {/* <Col xs="auto">
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-filter">
                            Filter
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#">Option 1</Dropdown.Item>
                            <Dropdown.Item href="#">Option 2</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col xs="auto">
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-sort">
                            Sort
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#">Price: Low to High</Dropdown.Item>
                            <Dropdown.Item href="#">Price: High to Low</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col> */}
