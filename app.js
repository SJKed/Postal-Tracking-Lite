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
    name: 'uniqueSessionID',
    resave: false,
    saveUninitialized: true,
}));

app.get('/', (req, res) => {
    if (req.session.loggedIn) {
        const user = req.session.user
        res.render('index', {user})
    } else {
        res.render('login');
    }
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/register', (req, res) => {
    res.render('register');
});
app.get('/tracking', (req, res) => {
    res.render('tracking')
})


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        res.redirect('/login', { error: 'User not found' });
    } else {
        if(password == user.password) {
            console.log('success')
            req.session.user = user;
            req.session.loggedIn = true;
            res.redirect('/');
        }
    }
});

app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (user) {
            res.render('register', { error: 'User already exists' });
        } else {
            const hash = await bcrypt.hash(password, 10);
            const newUser = await User.create({ email, password: hash });
            req.session.user = newUser;
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
    }
});


app.listen(8080, () => {
    console.log('Server started');
});

