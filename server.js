// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(express.json());

// Path to save user data
const dataFile = path.join(__dirname, 'data', 'users.json');

// Make sure file exists
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, '{}');
}

// Register new user
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  const users = JSON.parse(fs.readFileSync(dataFile));
  if (users[username]) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  users[username] = password;
  fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
  res.json({ message: 'Registered successfully' });
});

// Login user
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const users = JSON.parse(fs.readFileSync(dataFile));
  if (users[username] === password) {
    return res.json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
