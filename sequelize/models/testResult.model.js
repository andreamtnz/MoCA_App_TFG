const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('testResult', { 
        id: { 
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        evaluation: {
            allowNull:  true,
            type: DataTypes.STRING,
        },
        testType:{
            allowNull: false,
            type: DataTypes.ENUM,
            values: ['MoCA', 'MiniMental'],

        },
        patientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'patients', 
                key: 'id'
            }
        },
    });
}