# DecodeLabs Project 2 — Backend API Development

This project implements the requirements from the Project 2 brief:
- GET and POST API endpoints
- User input handling
- JSON responses
- Basic data validation
- HTTP status codes
- Server-side API logic

## Technology
- Node.js
- Express.js
- JSON

## 1. Install Node.js
Install Node.js LTS from the official Node.js website.

## 2. Install dependencies
Open this project folder in VS Code and run:

```bash
npm install
```

## 3. Start the server

```bash
npm start
```

For development with automatic restart:

```bash
npm run dev
```

The API will run at:

http://localhost:5000

## API Endpoints

### GET /
Returns API information.

### GET /api/users
Returns all users.

Example:

```bash
curl http://localhost:5000/api/users
```

### GET /api/users/1
Returns one user by ID.

### POST /api/users
Creates a new user.

Request body:

```json
{
  "name": "Peter Parker",
  "email": "peter@example.com",
  "age": 21
}
```

Example curl:

```bash
curl -X POST http://localhost:5000/api/users   -H "Content-Type: application/json"   -d "{"name":"Peter Parker","email":"peter@example.com","age":21}"
```

## Validation
The API checks:
- Required fields
- Name length
- Basic email format
- Age range
- Duplicate email

## Status Codes
- 200 — Successful GET request
- 201 — User successfully created
- 400 — Invalid input
- 404 — User/endpoint not found
- 409 — Duplicate email

## Testing with Postman
1. Start the server.
2. Open Postman.
3. Send `GET http://localhost:5000/api/users`.
4. Send a `POST` request to `http://localhost:5000/api/users`.
5. Select Body → raw → JSON.
6. Paste the sample JSON from above.
7. Check the response.

## Note
This version stores users in memory, so data resets whenever the server restarts. A database can be added as a future enhancement.
