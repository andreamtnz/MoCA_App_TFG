const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', { // nombre de la tabla: USER
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
            unique: false
        },
        createdAt:{
            allowNull: false,
            type: DATETIME,
        },
        updatedAt:{
            allowNull: false,
            type: DATETIME,
        },
    });
}