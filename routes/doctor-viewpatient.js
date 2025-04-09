const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize'); // Asegúrate de que la ruta sea correcta

// Verificación de que el usuario es un doctor
function isDoctor(req, res, next) {
  if (req.session.user && req.session.user.role === 'Doctor') {
      next(); // Si es doctor, continuar
  } else {
      res.redirect('/login'); // Si no, redirigir al inicio de sesión
  }
}

// get all tests from the specific test
router.get('/:id', isDoctor, async (req, res) => {//patient's id is a parameter
  const patientId = req.params.id;
  try {
    // Obtener la información del paciente por ID
    const patient = await sequelize.models.patient.findOne({
       where: { id: patientId },      
    });

    
    // Obtener los tests asociados a este paciente
    const tests = await sequelize.models.testResult.findAll({ where: { patientId: patientId } });

    if (!patient) {
      return res.status(404).send('Patient not found');
    }

    // Renderizar la vista con la información del user (doctor en este caso) y sus pacientes
    res.render('doctor-viewpatient', {
      user:req.session.user,
      patient,
      tests 
    });

  } catch (error) {
    console.error('Error fetching patient details:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;

