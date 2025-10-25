const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Register
app.post('/register', async (req, res) => {
    const { name, email, password, phone, photo } = req.body;
    if(!name || !email || !password) return res.status(400).send('All fields required');

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO users (name, email, password, phone, photo) VALUES (?, ?, ?, ?, ?)',
        [name, email, hashedPassword, phone, photo],
        (err, result) => {
            if(err) return res.status(500).send('Error registering user');
            res.send({ status: 'success', userId: result.insertId });
        }
    );
});

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).send('All fields required');

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if(err) return res.status(500).send('DB error');
        if(results.length === 0) return res.status(400).send('User not found');

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).send('Incorrect password');

        res.send({ status: 'success', user });
    });
});

// Forgot password
app.post('/forgot-password', async (req, res) => {
    const { email, newPassword } = req.body;
    if(!email || !newPassword) return res.status(400).send('All fields required');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email], (err) => {
        if(err) return res.status(500).send('DB error');
        res.send({ status: 'success', message: 'Password updated!' });
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
