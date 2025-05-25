const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize');

// Verify that the user is a doctor
function isDoctor(req, res, next) {
  if (req.session.user && req.session.user.role === 'Doctor') {
      next(); // Continue if it is a doctor
  } else {
      return res.redirect('/login'); // redirect to log in if it is not
  }
}

 
router.get('/:id', isDoctor, async (req, res) => {
  const patientId = req.params.id;
  try {
    // getting doctor based on user id
    const doctor = await sequelize.models.doctor.findOne({
      where: { userId: req.session.user.id,
      }
    })

    //getting patient based on its id and doctor id
    const patient = await sequelize.models.patient.findOne({
       where: { id: patientId,
          doctorId: doctor.id
       },      
    });

    //no patient found: does not exist or is not assigned to the doctor 
    if (!patient) {
      return res.redirect("/doctor-viewpatients");              
    }
    
    // getting tests from the patient
    const tests = await sequelize.models.testResult.findAll({ 
      where: { patientId: patientId },
      order: [['date', 'DESC']]
     });

    
    //rendering view to see specific patient info and tests
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

