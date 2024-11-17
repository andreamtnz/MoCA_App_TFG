const {Sequelize} = require('sequelize');
const bcrypt = require('bcrypt');
const logger = require('../logger');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'sequelize/db.sqlite'
});

const modelDefiners = [
    require('./models/user.model'),
    require('./models/patient.model'),
    require('./models/doctor.model'),
    require('./models/testResult.model'),
    // El resto de modelos
];

//define all models in sequelize
for (const modelDefiner of modelDefiners){
    modelDefiner(sequelize);
}

const { user, doctor } = sequelize.models;

user.hasMany(doctor, { foreignKey: 'userId' });
doctor.belongsTo(user, { foreignKey: 'userId' });

async function reset(){
    await sequelize.sync({force: true}).then(() =>{ // false para que no se reinice la DB
        console.log('Database synced successfully');
    }).catch(err => {
        console.error('Error syncing database:', err);
    }); 
    const count = await sequelize.models.user.count();
    const users = [
        {username: 'doctor', password: 'doctor', role: 'Doctor'},
        {username: 'admin', password: 'admin', role: 'Administrator'},
        
    ];
    
    if (count == 0){
        for (let index = 0; index < users.length; index++){
            users[index].password = await bcrypt.hash(users[index].username, 10);
        }
        await sequelize.models.user.bulkCreate(users);
        logger.info('Creados usuarios iniciales');
    } else {
        logger.info('Ya habia usuarios');
    }

    const countDoctors = await sequelize.models.doctor.count();
    const doctors = [
        {name: 'tbd', lastname: 'tbd', specialty: 'neurology', license_number: '00000000', description: 'I am a ver good doctor', image: 'uploads/doctor1.png', userId: '1'},
        {name: 'tbd2', lastname: 'tbd2', specialty: 'neurology', license_number: '00000000', description: 'I am a ver good doctor', image: 'uploads/default.png', userId: '2'},

    ];
    
    if (countDoctors == 0){
        /*for (let index = 0; index < users.length; index++){
            doctors[index].password = await bcrypt.hash(users[index].username, 10);
        }*/
        await sequelize.models.doctor.bulkCreate(doctors);
        logger.info('Creados doctores iniciales');
    } else {
        logger.info('Ya habia doctores');
    }
}

reset();

module.exports = sequelize;