// routes/patient-viewtests.js
const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize'); 

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  const user = req.session.user;

  if(!user || user.role != "Patient"){
    return res.redirect('/login');
  }

  
  try {
    const patient = await sequelize.models.patient.findOne({
       where: { userId: userId },
    });
    
    if(!patient){
        return res.status(404).send('Patient not found');
    }

    const tests = await sequelize.models.testResult.findAll({ where: { patientId: patient.id } });

    
    res.render('patient-tests', { //renderizamos vista tests
        tests,
        user: req.session.user,
    });
    

  } catch (error) {
    console.error('The error is here', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
