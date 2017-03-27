# User App v 1.1
App that able to create, read, update & delete user.
In this version authentication and authorization feature has been added

## Routes
Route | HTTP | Description
---------- | ---------- | ----------
/api/signup | POST | Sign up new user
/api/signin | POST | Sign in while get an access token based on credentials
/api/users | GET | Get all the users (admin only)
/api/users/:id | GET | Get a single users (admin and authenticated user)
/api/users | POST | Create a user (admin only)
/api/users/:id | DELETE | Delete a user (admin only)
/api/users/:id | PUT | Update a user with new info (admin and authenticated user)


## Usage
```
npm install
npm start
```
How to use : http://localhost:3000<use route available in the Routes table>
example :
To show all the users data
http://localhost:3000/api/users
