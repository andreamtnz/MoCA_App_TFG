const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


// Verificación de que el usuario es un administrador
function isPatient(req, res, next) {
    if (req.session.user && req.session.user.role === 'Patient') {
        next(); // Si es patient, continuar
    } else {
        res.redirect('/login'); // Si no, redirigir al inicio de sesión
    }
}

router.post('/', upload.single('zipfile'), async(req, res) => {
    
    try {
    if(!req.file){
        return res.status(400).json({error: 'No zip received.'});
    }

    const patient = await sequelize.models.patient.findOne({where: {userId: req.session.user.id}});

    if(!patient){
        return res.status(404).send("Patient not found.");
    }
    const date = new Date().toString();
    const zipBuffer = req.file.buffer;

    const testResult = await sequelize.models.testResult.create({
        date: date,
        zip_file: zipBuffer,
        testType: "MoCA",
        patientId: patient.id,
    });

    req.session.message = "testResult saved in DB";
    res.redirect("/patient-viewtests");
    }catch (error){
        console.error('Error saving results into db.', error);
        res.status(500).send('Server Error - Could not save results.');
    }
    

});

module.exports = router;