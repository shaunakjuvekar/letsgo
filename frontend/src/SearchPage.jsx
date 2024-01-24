import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import APIService from './APIService';
import { Container, InputGroup, FormControl, ListGroup, Button } from 'react-bootstrap';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [destinations, setDestinations] = useState([]);
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        if (searchTerm) {
            setTimeout(async () => {
                const response = await APIService.search(searchTerm);
                setDestinations(response.destinations);
                setGroups(response.groups);
                setUsers(response.users);
            }, 500);
        }
    }, [searchTerm]);

    const handleViewDestination = (destination) => {
        navigate('/destination-detail', { state: { destination } });
    };

    const handleViewGroup = (groupId) => {
        navigate(`/group/${groupId}`);
    };

    const handleViewUser = (userId) => {
        navigate(`/profile/${userId}`); // Update the route as per your app's routing
    };

    return (
        <Container>
            <InputGroup className="mb-3">
                <FormControl
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    autoFocus
                />
                <Button variant="outline-secondary" className="ml-2">
                    <i className="fa fa-search"></i>
                </Button>
            </InputGroup>

            {searchTerm === '' ? (
                <p>Start searching! Or start typing to explore Blacksburg.</p>
            ) : (
                <>
                    <h4>Destinations</h4>
                    <ListGroup>
                        {destinations.map((destination, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                <span>{destination.name}</span>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleViewDestination(destination)}>
                                    View Destination
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    <h4 className="mt-4">Groups</h4>
                    <ListGroup>
                        {groups.map((group, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                <span>{group.group_name}</span>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleViewGroup(group.id)}>
                                    View Group
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    <h4 className="mt-4">Users</h4>
                    <ListGroup>
                        {users.map((user, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                <span>{user.first_name} {user.last_name}</span>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleViewUser(user.id)}>
                                    View Profile
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </>
            )}

            <Button className="mt-4" variant="secondary" onClick={() => navigate(-1)}>Go Back</Button>
        </Container>
    );
};

export default SearchPage;
