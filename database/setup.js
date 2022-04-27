const { User, Order} = require('../models');

User.sync({force: true})
Order.sync({force: true})
