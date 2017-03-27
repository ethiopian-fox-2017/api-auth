# API-auth
Demo app with basic REST API.
____

## REST API
List of user routes:

|Route | HTTP Method | Description |
|------|------|-------------|
|`/api/signup` | POST | Sign up with new user info |
|`/api/signin` | POST | Sign in while get an access token based on credentials |
|`/api/users` | GET | Get all the users info (admin only)|
|`/api/users/:id` | GET | Get a single user info (admin and authenticated user)|
|`/api/users` | POST | Create a user (admin only)|
|`/api/users/:id` | DELETE | Delete a user (admin only)|
|`/api/users/:id` | PUT | Update a user with new info (admin and authenticated user)|

All HTTP Methods described above can be executed using a Chrome app named  [POSTMAN](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en).


### Usage

With only npm:

```
npm install
npm start
```

Access the API via `http://localhost:3000/api`
