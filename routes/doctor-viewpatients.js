// routes/doctor-viewpatients.js
const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize'); 

// Verificación de que el usuario es un doctor
function isDoctor(req, res, next) {
    if (req.session.user && req.session.user.role === 'Doctor') {
        next(); // Si es doctor, continuar
    } else {
        res.redirect('/login'); // Si no, redirigir al inicio de sesión
    }
  }

router.get('/', isDoctor, async (req, res) => {
    try{
        const sessionUser = req.session.user;
                
        const doctor = await sequelize.models.doctor.findOne({
            where: { userId: sessionUser.id },
        });
        
        if(!doctor){
           return res.redirect('/login');
        }   

        const patients = await sequelize.models.patient.findAll({ where: { doctorId: doctor.id } });

        for (const patient of patients){
            const newTests = await sequelize.models.testResult.count({
                where: {
                    patientId: patient.id,
                    evaluation: null
                }
            });
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