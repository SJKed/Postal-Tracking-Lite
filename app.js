const express = require('express');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const {User, Order} = require('./models');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(8080, () => {
    console.log('Server started');
});

