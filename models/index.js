const {Sequelize} = require('sequelize');
const Users = require('./users');
const Orders = require('./orders');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database/postal.sqlite'
})

const User = Users(sequelize);
const Order = Orders(sequelize);

User.hasMany(Order, {foreignKey: 'userId'});
Order.belongsTo(User, {foreignKey: 'userId'});

module.exports = {
    User,
    Order,
};