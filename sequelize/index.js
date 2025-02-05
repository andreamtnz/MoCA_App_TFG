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

const { user, doctor, patient } = sequelize.models;

user.hasMany(doctor, { foreignKey: 'userId' });
doctor.belongsTo(user, { foreignKey: 'userId' });

user.hasMany(patient, {foreignKey: 'userId'});
patient.belongsTo(user, { foreignKey: 'userId' });

doctor.hasMany(patient, { foreignKey: 'doctorId'});
patient.belongsTo(doctor, { foreignKey: 'doctorId' });


async function reset(){
    await sequelize.sync({force: false}).then(() =>{ // false para que no se reinice la DB
        console.log('Database synced successfully');
    }).catch(err => {
        console.error('Error syncing database:', err);
    }); 

    const countAdmins = await sequelize.models.user.count({
        where: { role: 'Administrator' }
    });
    const countDocs = await sequelize.models.user.count({
        where: { role: 'Doctor' }
    });
      
    const admin = {username: 'admin', password: 'admin', role: 'Administrator'};
    const docs = [
        {username: 'doctor1', password: 'doctor1', role: 'Doctor'},
        {username: 'doctor2', password: 'doctor2', role: 'Doctor'},   
    ];
    
    if (countAdmins == 0){ // no admins
        admin.password = await bcrypt.hash(admin.password, 10);
        await sequelize.models.user.create(admin);
        logger.info('Creating starting admin...');
    } else {
        logger.info('Starting admin already exists.');
    }

    if (countDocs == 0){ // no docs
        for (let index = 0; index < docs.length; index++){
            docs[index].password = await bcrypt.hash(docs[index].password, 10);
        }
        const createdDocs = await sequelize.models.user.bulkCreate(docs, {returning: true});
        logger.info('Creating users of starting docs...');
        const createdIds = createdDocs.map(doc => doc.id);
        console.log('Created IDs: ', createdIds);

        const doctors = [
            {name: 'doctor1', lastname: 'doctor1', specialty: 'neurology', license_number: '123456789', description: 'I am a very good doctor', image: 'uploads/doctor1.png', userId: createdIds[0]},
            {name: 'doctor2', lastname: 'doctor2', specialty: 'neurology', license_number: '987654321', description: 'I am a very good doctor too', image: 'uploads/default.png', userId: createdIds[1]},
        ];
        await sequelize.models.doctor.bulkCreate(doctors);
        logger.info('Creating starting docs...');
    } else {
        logger.info('Starting docs already exist.');
    }

   
}

reset();

module.exports = sequelize;