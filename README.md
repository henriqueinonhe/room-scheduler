# Room Scheduler

Fake room scheduling REST API.

## Installation

You must have [**docker**](https://www.docker.com/) installed.

Clone the repo:

```sh
git clone https://github.com/henriqueinonhe/room-scheduler
```

Run the containers:

```sh
cd room-scheduler
docker-compose up
```

And then you're good to go!

There are two services: 
1. A node backend server
2. A mysql database

### Database (MySQL)

The database may be accessed via localhost:

- Host: localhost
- Port: 31415
- User: admin
- Password: dubbsdibbets
- Database: RoomScheduler

### API (Node)

Exposed at localhost:31414

To check whether the services are working as expected, visit http://localhost:31414/check

## Requirements

- Web client must be a **single page application**
- Users must be able to themselves
- Users must be able to login
- Users must be able to logout
- Whenever a user is logged in, there must be a visual indication that it is actually logged (like displaying the username somewhere)
- Common users must be able to see the list of existing rooms
- Common users must be able to see the allocations for a given room, for a given day
- Common users must be able to allocate a room for themselves
- Common users must be able to delete an allocation they created
- Common users must be able to see a list of all allocations that belong to them
- Admin users must be able to do everthing a common user can do
- Admin users must be able to see the list of existing users
- Admin users must be able to delete an user
- Admin users must be able to see the list of all allocations that belong to any user
- Admin users must be able to see the list of all allocations
- Admin users must be able do create an allocation for any user
- Admin users must be able to delete allocations for any user