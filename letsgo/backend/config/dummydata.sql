-- Inserting data specific to Blacksburg, Virginia into travel_destinations
INSERT INTO letsgo.travel_destinations (name, description, address) VALUES
('Hahn Horticulture Garden', 'A beautiful six-acre public garden on the Virginia Tech campus that offers a peaceful getaway.', '200 Garden Ln, Blacksburg, VA 24061, United States'),
('Smithfield Plantation', 'A well-preserved 18th-century plantation that provides historical insights into colonial life.', '1000 Smithfield Plantation Rd, Blacksburg, VA 24060, United States'),
('Moss Arts Center', 'A vibrant arts center that features various performances, exhibitions, and events throughout the year.', '190 Alumni Mall, Blacksburg, VA 24060, United States');

-- Inserting data into users (Assuming password is hashed)
INSERT INTO letsgo.users (email, password) VALUES
('alex.jordan@blacksburgmail.com', 'hashedpassword1'),
('sam.taylor@blacksburgmail.com', 'hashedpassword2');

-- Inserting data into user_profiles
INSERT INTO letsgo.user_profiles (first_name, last_name, date_of_birth, address_line_1, city, state, country, zip_code, user_id) VALUES
('Alex', 'Jordan', '1988-03-22', '350 Old Turner St', 'Blacksburg', 'VA', 'USA', '24061', 1),
('Sam', 'Taylor', '1992-07-14', '455 Progress St', 'Blacksburg', 'VA', 'USA', '24060', 2);

Inserting data into user_profile_travel_destination_mapping (mapping to be adjusted based on actual IDs)
INSERT INTO letsgo.user_profile_travel_destination_mapping (user_profile_id, travel_destination_id, trip_experience, rating) VALUES
(1, 1, 'I visited the Hahn Horticulture Garden and it was absolutely stunning. The variety of plants and flowers was breathtaking.', 5),
(2, 2, 'I had a great time exploring the Smithfield Plantation. The historical insights provided a fascinating glimpse into colonial life.', 4);

-- Inserting data into group_info (group names are examples)
INSERT INTO letsgo.group_info (group_name, travel_destination_name, created_user_id, trip_start_date, trip_end_date) VALUES
('VT Garden Lovers', 'Hahn Horticulture Garden', 1, '2023-11-01', '2023-11-30'),
('Blacksburg History Group', 'Smithfield Plantation', 2, '2023-11-01', '2023-11-30');

-- Inserting data into user_group_mapping (mapping to be adjusted based on actual IDs)
INSERT INTO letsgo.user_group_mapping (user_id, group_id) VALUES
(1, 1),
(2, 2);

-- Inserting data into friends
INSERT INTO letsgo.friends (user_id, friend_user_id) VALUES
(1, 2),
(2, 1);

INSERT INTO letsgo.events (event_name, event_description, event_date, event_address, LATITUDE, LONGITUDE) 
VALUES 
('Yoga and Meditation Workshop', 'Join us for a relaxing yoga and meditation session.', '2023-11-15', 'Squires Student Center Room 236', '40.7128', '-74.0060'),
('Karaoke Night', 'Bring your singing talent and join us for a fun-filled karaoke night.', '2023-11-20', 'PK Bar and Grill', '34.0522', '-118.2437'),
('Pumpkin Carving', 'Get creative with pumpkin carving in this Halloween-themed event.', '2023-12-01', 'GLC Lawn', '41.8781', '-87.6298'),
('Virginia Tech Wind Ensemble Concert', 'Enjoy a captivating performance by the Virginia Tech Wind Ensemble.', '2023-12-10', 'Moss Arts Center', '37.7749', '-122.4194');
