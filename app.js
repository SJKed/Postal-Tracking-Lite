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
    if (req.session.user) {
        res.render('index', { user: req.session.user })
    } else {
        res.render('index', { user: null })
    };
}
);
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/register', (req, res) => {
    res.render('register');
});
app.get('/tracking', async (req, res) => {
    if (req.session.user) {
        const userOrders = await Order.findAll({ where: { userId: req.session.user.userId } });
        console.log(userOrders);
        res.render('tracking', { userOrders, user: req.session.user });
    } else {
        res.render('login');
    }
});
app.get('/logout', (req, res) => {
    console.log('logging out');
    req.session.destroy();
    res.redirect('/');
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        res.redirect('/login', { error: 'User not found' });
    } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            console.log('login successful');
            req.session.user = user;
            res.redirect('/');
        } else {
            res.redirect('/login', { error: 'Incorrect password' });
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

