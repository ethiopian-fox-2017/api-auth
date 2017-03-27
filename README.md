# M-APP
Demo app with basic REST API

### REST API

Below is usage of our API:

| Route | HTTP | Description |
| :--- | :---: | :--- |
| /api/users | GET | Get all the user details |
| /api/users/:id | GET | Get detail user by id |
| /api/users | POST | Add user* |
| /api/users/:id | DELETE | Delete user by id |
| /api/users/:id | PUT | Update user with new detail* |
| /api/users/:id | PATCH | Update user with specific info detail* |

\* You must specify property for adding or updating book:
  - username [string]
  - password [string]
  - name [string]
  - dateofbirth [integer]
  - placeofbirth [integer]
  - gender [string]
  - role [string]

### Usage

With only npm:

```javascript
npm install
npm start
npm run dev
```

Access the website via http://localhost:3000 or API via http://localhost:3000/api
