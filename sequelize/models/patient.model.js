const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', { // nombre de la tabla: USER
        id: { // asi se pone casa atributo
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        
        dob:{
            allowNull: false,
            type: DataTypes.DATE,
        },
        phone:{
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        gender: {
            type: DataTypes.ENUM,
            values: ['male', 'female'], // Possible values for the enum
            allowNull: false, // Make this field mandatory if needed
        },
    });
}