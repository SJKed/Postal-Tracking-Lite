const { DataTypes, Model } = require('sequelize');

module.exports = database => {
    class Orders extends Model { }

    Orders.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        orderStatus: {
            type: DataTypes.STRING,
            allowNull: false
        },
        orderName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        trackingCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: false
        },
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        sequelize: database,
        modelName: 'Orders',
    }
    )
    return Orders;
}

