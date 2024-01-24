create table letsgo.travel_destinations (
    id int auto_increment primary key,
    name varchar(255) null,
    description text null,
    address varchar(255) null,
    LATITUDE VARCHAR(15) null,
    LONGITUDE VARCHAR(15) null LONGITUDE VARCHAR(15) null
);
create table letsgo.users (
    id int auto_increment primary key,
    email varchar(255) not null,
    password varchar(255) not null
);
create table letsgo.user_profiles (
    id int auto_increment primary key,
    first_name varchar(255) null,
    last_name varchar(255) null,
    date_of_birth date null,
    address_line_1 varchar(255) null,
    address_line_2 varchar(255) null,
    city varchar(255) null,
    state varchar(255) null,
    country varchar(255) null,
    zip_code varchar(20) null,
    user_id int null unique,
    constraint user_profiles_ibfk_1 foreign key (user_id) references letsgo.users (id)
);
create table letsgo.events (
    id int auto_increment primary key,
    event_name varchar(255) not null,
    event_description text not null,
    event_date date not null,
    event_address varchar(255) null,
    LATITUDE VARCHAR(15) null,
    LONGITUDE VARCHAR(15) null
);
create table letsgo.user_profile_events_mapping (
    id int auto_increment primary key,
    user_profile_id int not null,
    event_id int not null,
    constraint user_profile_events_mapping_ibfk_1 foreign key (user_profile_id) references letsgo.user_profiles (id),
    constraint user_profile_events_mapping_ibfk_2 foreign key (event_id) references letsgo.events (id)
);
create table letsgo.reports (
    id int auto_increment primary key,
    reportee_id int not null,
    reporter_id int null,
    description varchar(255) null,
    is_addressed tinyint(1) default 0 null
);
create table letsgo.group_info (
    id int auto_increment primary key,
    group_name varchar(255) not null,
    travel_destination_name varchar(255) not null,
    created_user_id int not null,
    trip_start_date date null,
    trip_end_date date null,
    constraint created_id_ibfk_1 foreign key (created_user_id) references letsgo.users (id)
);
create table letsgo.user_group_mapping (
    id int auto_increment primary key,
    user_id int null,
    group_id int null,
    constraint user_group_mapping_ibfk_1 foreign key (user_id) references letsgo.users (id),
    constraint user_group_mapping_ibfk_2 foreign key (group_id) references letsgo.group_info (id)
);
create table letsgo.friends (
    id int auto_increment primary key,
    user_id int null,
    friend_user_id int null,
    constraint friends_ibfk_1 foreign key (user_id) references letsgo.users (id),
    constraint friends_ibfk_2 foreign key (friend_user_id) references letsgo.users (id)
);
create table letsgo.chat_messages (
    id int auto_increment primary key,
    message text not null,
    from_user int not null,
    to_id int not null,
    to_type enum ('user', 'group') not null,
    created_at timestamp default current_timestamp,
    constraint chat_messages_ibfk_1 foreign key (from_user) references letsgo.users (id)
);
create table letsgo.user_profile_travel_destination_mapping (
    id int auto_increment primary key,
    user_profile_id int null,
    travel_destination_id int null,
    trip_experience text null,
    rating int null,
    constraint user_profile_travel_destination_mapping_ibfk_1 foreign key (user_profile_id) references letsgo.user_profiles (id),
    constraint user_profile_travel_destination_mapping_ibfk_2 foreign key (travel_destination_id) references letsgo.travel_destinations (id)
);
create index user_profile_user_id_idx on letsgo.user_profiles (user_id);
create index group_info_created_user_id_idx on letsgo.group_info (created_user_id);
create index user_group_mapping_user_id_idx on letsgo.user_group_mapping (user_id);
create index user_group_mapping_group_id_idx on letsgo.user_group_mapping (group_id);
create index friends_user_id_idx on letsgo.friends (user_id);
create index friends_friend_user_id_idx on letsgo.friends (friend_user_id);
create index chat_messages_from_user_idx on letsgo.chat_messages (from_user);
create index chat_messages_to_id_idx on letsgo.chat_messages (to_type, to_id);
