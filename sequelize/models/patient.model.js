const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('patient', { 
        id: { 
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        lastname: {
            allowNull: false,
            type: DataTypes.TEXT,
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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // Assuming there's a users table
                key: 'id'
            }
        },
        doctorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'doctors', // Assuming there's a doctors table
                key: 'id'
            }
        },
    });
}