const {DataTypes, Model} = require('sequelize');

module.exports = database => {
    class Users extends Model {}
    Users.init({
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize: database,
        modelName: 'Users',
        createdAt: false,
        updatedAt: false
    });
    return Users;
}