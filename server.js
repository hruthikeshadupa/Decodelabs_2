const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

let users = [
  { id: 1, name: "Tony Stark", email: "tony@example.com", age: 53 }
];

// Home / API information
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DecodeLabs Project 2 Backend API is running",
    endpoints: {
      getUsers: "GET /api/users",
      getUser: "GET /api/users/:id",
      createUser: "POST /api/users"
    }
  });
});

// GET - return all users
app.get("/api/users", (req, res) => {
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// GET - return one user
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      success: false,
      message: "User ID must be a number"
    });
  }

  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// POST - create a new user
app.post("/api/users", (req, res) => {
  const { name, email, age } = req.body;

  // Basic validation
  if (!name || !email || age === undefined) {
    return res.status(400).json({
      success: false,
      message: "name, email and age are required"
    });
  }

  if (typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: "Name must contain at least 2 characters"
    });
  }

  if (typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address"
    });
  }

  const numericAge = Number(age);
  if (!Number.isInteger(numericAge) || numericAge < 1 || numericAge > 120) {
    return res.status(400).json({
      success: false,
      message: "Age must be an integer between 1 and 120"
    });
  }

  const emailExists = users.some(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase()
  );

  if (emailExists) {
    return res.status(409).json({
      success: false,
      message: "A user with this email already exists"
    });
  }

  const newUser = {
    id: users.length ? Math.max(...users.map((user) => user.id)) + 1 : 1,
    name: name.trim(),
    email: email.trim(),
    age: numericAge
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser
  });
});

// Handle invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON request body"
    });
  }
  next(err);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found"
  });
});

app.listen(PORT, () => {
  console.log(`Backend API running at http://localhost:${PORT}`);
});
