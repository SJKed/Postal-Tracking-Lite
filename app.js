const express = require('express');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const { User, Order } = require('./models');
const session = require('express-session');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/register', (req, res) => {
    res.render('register');
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        res.render('login', { error: 'User not found' });
    } else {
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            res.render('login', { error: 'Invalid password' });
        } else {
            req.session.user = user;
            res.redirect('/tracking');
        }
    }
});

app.post('/register', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;
    if (password !== passwordConfirmation) {
        res.render('register', { error: 'Passwords do not match' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash });
    req.session.user = user;
    res.redirect('/index');
});





app.listen(8080, () => {
    console.log('Server started');
});

