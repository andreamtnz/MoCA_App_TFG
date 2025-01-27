const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('testResult', { 
        id: { 
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        date: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        zip_file: {
            allowNull: false,
            type: DataTypes.BLOB
        },
        evaluation: {
            allowNull:  true,
            type: DataTypes.STRING,
        },
        testType: {
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