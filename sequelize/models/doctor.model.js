const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('doctor', { 
        id: { 
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        specialty: {
            allowNull: false,
            type: DataTypes.ENUM,
            values: ['neurology', 'psycology'],
        },
        
        license_number:{
            allowNull: false,
            type: DataTypes.INTEGER,
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', 
                key: 'id'
            }
        },
    });
}