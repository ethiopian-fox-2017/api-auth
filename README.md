# api-auth

Demo app with basic REST API.

### REST API
List of user routes:

|     Route      |  HTTP  |          Description           |
| -------------- | ------ | ------------------------------ |
| /api/signup    | POST   | Sign up with new user info |
| /api/signup    | POST   | Sign in while get an access token based on credentials     |
| /api/users     | GET    | Get all teachers (admin only)              |
| /api/users/:id | GET    | Get a single teachers (admin and authenticated user)         |
| /api/users     | POST   | Create a teacher (admin only)              |
| /api/users/:id | DELETE | Delete a teacher (admin only)              |
| /api/users/:id | PUT    | Update a teacher with new info (admin and authenticated user) |


### Usage
With only npm:

npm install

npm start

Access the website via http://localhost:3000/api
