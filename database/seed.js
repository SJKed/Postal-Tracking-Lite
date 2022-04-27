const {User, Order} = require('../models');

User.bulkCreate([
    {
        username: 'admin',
        password: 'admin',
        email: 'admin@email.com',
        firstName: 'Admin',
        lastName: 'Admin',
        phone: '123456789',
        address: '123 Admin Street',
        city: 'Admin City',
        country: 'Admin Country',
        zip: '12345'
    },
    {
        username: 'SJK',
        password: 'supersafepassword',
        email: 'simonjkreplays@gmail.com',
        firstName: 'Simon',
        lastName: 'Jurstedt',
        phone: '123456789',
        address: '123 Simon Street',
        city: 'Simon City',
        country: 'Simon Country',
        zip: '12345'
    }
]);

Order.create({
    userId: 2,
    orderDate: new Date(),
    orderStatus: 'Pending'
});
