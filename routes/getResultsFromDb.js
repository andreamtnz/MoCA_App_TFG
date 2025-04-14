// routes/getResultsFromDb.js
const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize');

// Verificación de que el usuario es un doctor
function isDoctor(req, res, next) {
  if (req.session.user && req.session.user.role === 'Doctor') {
      next(); // Si es doctor, continuar
  } else {
      return res.redirect('/login'); // Si no, redirigir al inicio de sesión
  }
}

router.get('/:id/download', isDoctor, async (req, res) => {
  const testId = req.params.id;

  try {

    const doctor = await sequelize.models.doctor.findOne({
      where: {userId: req.session.user.id}
    })   

    const testResult = await sequelize.models.testResult.findOne({
      where: { id: testId },      
    });

    if (!testResult || !testResult.zip_file) { // no test is found
      return res.redirect('/doctor-viewpatients');
    } else{ // test found, lets check if the doctor trying to download the results is this patient's doctor
      const patient = await sequelize.models.patient.findOne({
        where: {id: testResult.patientId},
      })
      if(!patient){
        return res.redirect('/doctor-viewpatients')
      }else{
        if(patient.doctorId != doctor.id){ // patient's doctor is different from the doctor trying to download the results
        return res.redirect('/doctor-viewpatients')
      }
      }
  
      
  
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', `attachment; filename="test-${testId}.zip"`);
      res.send(testResult.zip_file); // Enviamos el buffer ZIP
      console.log("Sending file...")

    }

    
  } catch (error) {
    console.error("Error al descargar el archivo ZIP:", error);
    res.status(500).send("Error del servidor");
  }
});

module.exports = router;

  