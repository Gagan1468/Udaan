const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// ===== MySQL connection =====
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // apna MySQL username
    password: '',       // apna MySQL password
    database: 'prerna'  // database ka naam
});

db.connect((err) => {
    if(err) throw err;
    console.log("MySQL Connected");
});

// ===== Routes =====

// Register
app.post('/register', async (req, res) => {
    const { name, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, phone, hashedPassword], (err, result) => {
        if(err) return res.status(500).send("Error registering user");
        res.send({ message: "User registered successfully" });
    });
});

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if(err) return res.status(500).send("Database error");
        if(results.length === 0) return res.status(400).send({ message: "No user found" });

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).send({ message: "Incorrect password" });

        res.send({
            message: "Login successful",
            user: { name: user.name, email: user.email, phone: user.phone }
        });
    });
});

// Forgot password / change password
app.post('/forgot-password', async (req, res) => {
    const { email, newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const sql = "UPDATE users SET password = ? WHERE email = ?";
    db.query(sql, [hashedPassword, email], (err, result) => {
        if(err) return res.status(500).send("Error updating password");
        if(result.affectedRows === 0) return res.status(400).send({ message: "No user with this email" });
        res.send({ message: "Password updated successfully" });
    });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
