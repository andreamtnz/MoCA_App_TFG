const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', { // nombre de la tabla: USERS
        id: { // asi se pone casa atributo
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                is: /^\w{3,}$/
            }
        },
        password:{
            allowNull: false,
            type: DataTypes.STRING,
            unique: false,
            validate: {
                is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
            }
        },
        createdAt:{
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt:{
            allowNull: false,
            type: DataTypes.DATE,
        },
        role: {
            type: DataTypes.ENUM,
            values: ['Administrator', 'Doctor','Patient'], // Possible values for the enum
            allowNull: true, 
        },
    });
}