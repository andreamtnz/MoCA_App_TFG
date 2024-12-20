const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('doctor', { 
        id: { 
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        lastname: {
            allowNull: false,
            type: DataTypes.TEXT,
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
        description: {
            allowNull: true,
            type: DataTypes.TEXT,
        },
        image: {
            allowNull: true,
            type: DataTypes.TEXT, //ruta de la imagen
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