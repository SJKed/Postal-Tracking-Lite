const {User, Order} = require('../models');

User.bulkCreate([
    {
        email: 'admin@email.com',
        password: 'admin',
        firstName: 'Admin',
        lastName: 'Admin',
        phone: '123456789',
        address: '123 Admin Street',
        city: 'Admin City',
        country: 'Admin Country',
        zip: '12345'
    },
    {
        email: 'simonjkreplays@gmail.com',
        password: 'supersafepassword',
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
    orderStatus: 'On the way',
    orderName: 'CARDMARKET GHB',
    trackingCode: '2415321SE',
    firstName: 'Simon',
    lastName: 'Jurstedt',
    phone: '123456789',
    address: '123 Simon Street',
    city: 'Simon City',
    country: 'Simon Country',
    zip: '12345'
});
