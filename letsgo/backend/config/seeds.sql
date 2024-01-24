INSERT INTO letsgo.travel_destinations (name, description, address, LATITUDE, LONGITUDE)
VALUES (
        'Cascade Falls',
        'A scenic waterfall hike',
        'Pembroke, VA',
        '37.3536',
        '-80.5995'
    ),
    (
        'Hahn Horticulture Garden',
        'Beautiful garden on VT campus',
        '200 Garden Lane, Blacksburg, VA',
        '37.2197',
        '-80.4244'
    ),
    (
        'Smithfield Plantation',
        'Historic plantation house',
        '1000 Smithfield Plantation Rd, Blacksburg, VA',
        '37.2052',
        '-80.4200'
    ),
    (
        'New River Junction',
        'Popular tubing and outdoor spot',
        '2591 McCoy Rd, Blacksburg, VA',
        '37.2296',
        '-80.4391'
    ),
    (
        'Pandapas Pond',
        'Peaceful pond and woodland area',
        '1105 Pandapas Pond Rd, Blacksburg, VA',
        '37.3220',
        '-80.5287'
    ),
    (
        'Lane Stadium',
        'Famous VT football stadium',
        '285 Spring Rd, Blacksburg, VA',
        '37.2200',
        '-80.4176'
    ),
    (
        'Claytor Lake State Park',
        'Park with lake activities',
        '6620 Ben H. Bolen Dr, Dublin, VA',
        '37.0579',
        '-80.6278'
    ),
    (
        'McAfee Knob',
        'Iconic hiking destination',
        'Catawba Valley Dr, Catawba, VA',
        '37.3803',
        '-80.0890'
    ),
    (
        'Downtown Blacksburg',
        'Vibrant town center',
        'College Ave, Blacksburg, VA',
        '37.2294',
        '-80.4177'
    ),
    (
        'Floyd Country Store',
        'Famous for music and local crafts',
        '206 S Locust St, Floyd, VA',
        '36.9112',
        '-80.3201'
    );
INSERT INTO letsgo.users (email, password)
VALUES ('hokie1@vt.edu', 'password1'),
    ('hokie2@vt.edu', 'password2'),
    ('hokie3@vt.edu', 'password3'),
    ('hokie4@vt.edu', 'password4'),
    ('hokie5@vt.edu', 'password5'),
    ('hokie6@vt.edu', 'password6'),
    ('hokie7@vt.edu', 'password7'),
    ('hokie8@vt.edu', 'password8'),
    ('hokie9@vt.edu', 'password9'),
    ('hokie10@vt.edu', 'password10'),
    ('hokie11@vt.edu', 'password11'),
    ('hokie12@vt.edu', 'password12'),
    ('hokie13@vt.edu', 'password13'),
    ('hokie14@vt.edu', 'password14'),
    ('hokie15@vt.edu', 'password15');
INSERT INTO letsgo.user_profiles (
        first_name,
        last_name,
        date_of_birth,
        address_line_1,
        address_line_2,
        city,
        state,
        country,
        zip_code,
        user_id
    )
VALUES (
        'John',
        'Doe',
        '1999-01-01',
        '123 Hokie Lane',
        'Apt 1',
        'Blacksburg',
        'VA',
        'USA',
        '24060',
        1
    ),
    (
        'Jane',
        'Smith',
        '2000-02-02',
        '456 Hokie Road',
        'Apt 2',
        'Blacksburg',
        'VA',
        'USA',
        '24061',
        2
    ),
    (
        'Alice',
        'Johnson',
        '1998-03-03',
        '789 Hokie Street',
        'Apt 3',
        'Blacksburg',
        'VA',
        'USA',
        '24062',
        3
    ),
    (
        'Bob',
        'Williams',
        '2001-04-04',
        '101 Hokie Blvd',
        'Apt 4',
        'Blacksburg',
        'VA',
        'USA',
        '24063',
        4
    ),
    (
        'Charlie',
        'Brown',
        '2002-05-05',
        '202 Hokie Ave',
        'Apt 5',
        'Blacksburg',
        'VA',
        'USA',
        '24064',
        5
    ),
    (
        'Emily',
        'Davis',
        '2003-06-06',
        '303 Hokie Terrace',
        'Apt 6',
        'Blacksburg',
        'VA',
        'USA',
        '24065',
        6
    ),
    (
        'David',
        'Wilson',
        '1997-07-07',
        '404 Hokie Place',
        'Apt 7',
        'Blacksburg',
        'VA',
        'USA',
        '24066',
        7
    ),
    (
        'Sophia',
        'Miller',
        '1996-08-08',
        '505 Hokie Court',
        'Apt 8',
        'Blacksburg',
        'VA',
        'USA',
        '24067',
        8
    ),
    (
        'Michael',
        'Anderson',
        '2004-09-09',
        '606 Hokie Path',
        'Apt 9',
        'Blacksburg',
        'VA',
        'USA',
        '24068',
        9
    ),
    (
        'Emma',
        'Taylor',
        '1995-10-10',
        '707 Hokie Way',
        'Apt 10',
        'Blacksburg',
        'VA',
        'USA',
        '24069',
        10
    ),
    (
        'Ethan',
        'Moore',
        '2005-11-11',
        '808 Hokie Drive',
        'Apt 11',
        'Blacksburg',
        'VA',
        'USA',
        '24070',
        11
    ),
    (
        'Olivia',
        'Jackson',
        '1994-12-12',
        '909 Hokie Lane',
        'Apt 12',
        'Blacksburg',
        'VA',
        'USA',
        '24071',
        12
    ),
    (
        'Mason',
        'Martin',
        '1993-01-13',
        '1010 Hokie Road',
        'Apt 13',
        'Blacksburg',
        'VA',
        'USA',
        '24072',
        13
    ),
    (
        'Sophie',
        'Lee',
        '2006-02-14',
        '1111 Hokie Street',
        'Apt 14',
        'Blacksburg',
        'VA',
        'USA',
        '24073',
        14
    ),
    (
        'Noah',
        'Harris',
        '2007-03-15',
        '1212 Hokie Blvd',
        'Apt 15',
        'Blacksburg',
        'VA',
        'USA',
        '24074',
        15
    );
INSERT INTO letsgo.user_profile_travel_destination_mapping (user_profile_id, travel_destination_id)
VALUES (1, 1),
    (1, 2),
    (2, 3),
    (2, 4),
    (3, 5),
    (3, 6),
    (4, 7),
    (4, 1),
    (5, 2),
    (5, 3),
    (6, 4),
    (6, 5),
    (7, 6),
    (7, 7),
    (8, 1),
    (8, 2),
    (9, 3),
    (9, 4),
    (10, 5),
    (10, 6),
    (11, 7),
    (11, 1),
    (12, 2),
    (12, 3),
    (13, 4),
    (13, 5),
    (14, 6),
    (14, 7),
    (15, 1),
    (15, 2);
INSERT INTO letsgo.group_info (
        group_name,
        travel_destination_name,
        created_user_id
    )
VALUES ('Hiking Enthusiasts', 'Cascade Falls', 1),
    ('Nature Lovers', 'Pandapas Pond', 2),
    ('VT Football Fans', 'Lane Stadium', 3),
    ('History Buffs', 'Smithfield Plantation', 4),
    ('Outdoor Adventures', 'McAfee Knob', 5);
INSERT INTO letsgo.user_group_mapping (user_id, group_id)
VALUES (1, 1),
    (1, 2),
    (2, 2),
    (2, 3),
    (3, 3),
    (3, 4),
    (4, 4),
    (4, 1),
    (5, 1),
    (5, 2),
    (6, 2),
    (6, 3),
    (7, 3),
    (7, 4),
    (8, 4),
    (8, 5),
    (9, 5),
    (9, 1),
    (10, 1),
    (10, 2),
    (11, 2),
    (11, 3),
    (12, 3),
    (12, 4),
    (13, 4),
    (13, 5),
    (14, 5),
    (14, 1),
    (15, 1),
    (15, 2);
INSERT INTO letsgo.friends (user_id, friend_user_id)
VALUES (1, 2),
    (1, 3),
    (2, 1),
    (2, 3),
    (3, 1),
    (3, 2),
    (4, 5),
    (4, 6),
    (5, 4),
    (5, 6),
    (6, 4),
    (6, 5),
    (7, 8),
    (7, 9),
    (8, 7),
    (8, 9),
    (9, 7),
    (9, 8),
    (10, 11),
    (10, 12),
    (11, 10),
    (11, 12),
    (12, 10),
    (12, 11),
    (13, 14),
    (13, 15),
    (14, 13),
    (14, 15),
    (15, 13),
    (15, 14),
    (1, 4),
    (1, 5),
    (2, 6),
    (2, 7),
    (3, 8),
    (3, 9),
    (4, 10),
    (4, 11),
    (5, 12),
    (5, 13),
    (6, 14),
    (6, 15);
INSERT INTO letsgo.chat_messages (message, from_user, to_id, to_type)
VALUES (
        'Hey, are you attending the class today?',
        1,
        2,
        'user'
    ),
    (
        'Can you share the notes from yesterday?',
        2,
        1,
        'user'
    ),
    ('Let’s catch up for coffee later.', 3, 4, 'user'),
    (
        'Reminder: Group meeting at 6 PM.',
        4,
        1,
        'group'
    ),
    (
        'Anyone up for a game this evening?',
        5,
        2,
        'group'
    ),
    (
        'What’s the plan for this weekend?',
        6,
        3,
        'group'
    ),
    (
        'Can someone help me with the assignment?',
        7,
        4,
        'user'
    ),
    ('Great job on the project, team!', 8, 2, 'group'),
    ('Is the library open now?', 9, 5, 'user'),
    (
        'Who’s bringing snacks for the movie night?',
        10,
        3,
        'group'
    ),
    (
        'Are we still on for hiking tomorrow?',
        11,
        1,
        'user'
    ),
    (
        'I found a great spot for our next outing.',
        12,
        2,
        'group'
    ),
    (
        'Anyone interested in a study group tonight?',
        13,
        6,
        'user'
    ),
    (
        'When is the next football match?',
        14,
        3,
        'group'
    ),
    (
        'I left my charger in the lab, has anyone seen it?',
        15,
        7,
        'user'
    ),
    (
        'Let’s organize a carpool for the trip.',
        1,
        4,
        'group'
    ),
    (
        'Does anyone have the textbook for Econ 101?',
        2,
        8,
        'user'
    ),
    (
        'Who is going to the concert next week?',
        3,
        5,
        'group'
    ),
    (
        'Let’s meet in the usual spot for lunch.',
        4,
        9,
        'user'
    ),
    (
        'I need help with the coding part of our project.',
        5,
        10,
        'user'
    ),
    (
        'Let’s plan a beach trip for the summer break!',
        6,
        1,
        'group'
    ),
    (
        'Has anyone seen the new cafe on Main Street?',
        7,
        11,
        'user'
    ),
    (
        'We need a few more people for the soccer team.',
        8,
        2,
        'group'
    ),
    (
        'Can we reschedule our meeting to tomorrow?',
        9,
        12,
        'user'
    ),
    (
        'Don’t forget to bring your ID for the event.',
        10,
        3,
        'group'
    );
INSERT INTO letsgo.chat_messages (message, from_user, to_id, to_type)
VALUES (
        'Anyone up for a study session in Torgersen Hall?',
        11,
        13,
        'user'
    ),
    (
        'Who’s in for the game night on Friday?',
        12,
        4,
        'group'
    ),
    (
        'Is the math homework due tomorrow?',
        13,
        14,
        'user'
    ),
    (
        'We should plan a trip to Cascade Falls!',
        14,
        5,
        'group'
    ),
    (
        'Has anyone completed the lab assignment?',
        15,
        15,
        'user'
    ),
    (
        'Let’s grab dinner at West End after class.',
        1,
        6,
        'user'
    ),
    (
        'I left my notebook in the last lecture, did anyone pick it up?',
        2,
        7,
        'user'
    ),
    (
        'Movie night this Saturday! Who’s joining?',
        3,
        8,
        'group'
    ),
    (
        'Reminder: team meeting at 2 PM in the library.',
        4,
        9,
        'user'
    ),
    (
        'Does anyone want to join the cycling club?',
        5,
        10,
        'group'
    ),
    (
        'I need a partner for the tennis tournament.',
        6,
        11,
        'user'
    ),
    (
        'Let’s organize a photography walk this weekend.',
        7,
        12,
        'group'
    ),
    (
        'Who’s taking the Physics 101 exam next week?',
        8,
        13,
        'user'
    ),
    (
        'We should visit the Hahn Horticulture Garden soon.',
        9,
        6,
        'group'
    ),
    (
        'I’m looking for a roommate for next semester.',
        10,
        14,
        'user'
    ),
    (
        'Let’s do a group study for the finals.',
        11,
        15,
        'group'
    ),
    (
        'Is anyone attending the career fair next week?',
        12,
        7,
        'user'
    ),
    (
        'We need volunteers for the community service event.',
        13,
        8,
        'group'
    ),
    (
        'Who’s up for a road trip to Charlotte?',
        14,
        9,
        'user'
    ),
    (
        'Let’s celebrate the end of exams at Downtown!',
        15,
        10,
        'group'
    ),
    (
        'Does anyone have notes for the chemistry lecture?',
        1,
        11,
        'user'
    ),
    ('We should start a music band!', 2, 12, 'group'),
    (
        'Anyone knows a good tutor for Calculus?',
        3,
        13,
        'user'
    ),
    (
        'Let’s arrange a soccer match against the neighboring dorm.',
        4,
        14,
        'group'
    ),
    (
        'Anyone wants to join for a run tomorrow morning?',
        5,
        15,
        'user'
    );
INSERT INTO letsgo.chat_messages (message, from_user, to_id, to_type)
VALUES (
        'Anyone up for a trip to the National D-Day Memorial?',
        1,
        14,
        'group'
    ),
    (
        'Does anyone have a spare charger?',
        2,
        28,
        'user'
    ),
    (
        'We should have a farewell party for our seniors.',
        3,
        15,
        'group'
    ),
    (
        'Can anyone lend me the notes for today’s history lecture?',
        4,
        29,
        'user'
    ),
    (
        'Let’s do a group outing to Smithfield Plantation.',
        5,
        16,
        'group'
    ),
    (
        'Who’s going to the TEDxVirginiaTech event?',
        6,
        30,
        'user'
    ),
    (
        'We need players for the intramural soccer team.',
        7,
        17,
        'group'
    ),
    ('Is anyone selling a bike?', 8, 1, 'user'),
    (
        'Let’s plan a night out at Downtown Blacksburg.',
        9,
        18,
        'group'
    ),
    (
        'Anyone interested in a kayaking adventure?',
        10,
        2,
        'user'
    ),
    (
        'Let’s do a movie marathon this Friday.',
        11,
        19,
        'group'
    ),
    (
        'Is there a group going to the football game this weekend?',
        12,
        3,
        'user'
    ),
    (
        'We should visit the Huckleberry Trail.',
        13,
        20,
        'group'
    ),
    (
        'Anyone interested in a carpool to Richmond?',
        14,
        4,
        'user'
    ),
    (
        'We need volunteers for the upcoming college fest.',
        15,
        21,
        'group'
    ),
    (
        'Who’s attending the career workshop tomorrow?',
        1,
        5,
        'user'
    ),
    (
        'Let’s organize a study session for the finals.',
        2,
        22,
        'group'
    ),
    (
        'Does anyone have a graphing calculator I could borrow?',
        3,
        6,
        'user'
    ),
    (
        'We’re planning a BBQ next Saturday, who’s in?',
        4,
        23,
        'group'
    ),
    (
        'Anyone wants to join the robotics club?',
        5,
        7,
        'user'
    ),
    (
        'Let’s have a group study for the Physics exam.',
        6,
        24,
        'group'
    ),
    (
        'Can someone help me with Java programming?',
        7,
        8,
        'user'
    );
