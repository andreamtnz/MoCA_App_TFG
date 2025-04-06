// routes/doctor-viewpatients.js
const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize'); 

router.get('/', async (req, res) => {
    try{
        const sessionUser = req.session.user;
        const user = await sequelize.models.user.findOne({
            where: {id: sessionUser.id},
        });

        if(!user || user.role != "Doctor"){
            return res.redirect('/login');
        }
  
        const doctor = await sequelize.models.doctor.findOne({
            where: { userId: user.id },
        });
        
        if(!doctor){
            return res.status(404).send('Doctor not found');
        }   

        const patients = await sequelize.models.patient.findAll({ where: { doctorId: doctor.id } });
        for (const patient of patients){
            const newTests = await sequelize.models.testResult.count({
                where: {
                    patientId: patient.id,
                    evaluation: null
                }
            });
            //patient.setDataValue('newTests', newTests)
            patient.dataValues.newTests = newTests;
            console.log("New tests: ", patient.dataValues.newTests);
        }

        
        res.render('doctor-viewpatients', { //renderizamos vista doctor-viewpatients
            patients,
            user: req.session.user,
        });
    

    } catch (error) {
        console.error('Error in route doctor-viewpatients', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;