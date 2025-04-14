const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize');


router.get('/', async(req, res) => {
  try{
    //const sessionUser = req.session.user;
    const user = await sequelize.models.user.findOne({
      where: {id: req.session.user.id},
    });

    if (user.role == 'Doctor'){
      const doctor = await sequelize.models.doctor.findOne({
        where: {userId: user.id},
      });
      res.render('myprofile', {
        user: req.session.user,
        doctor,
      });

    } else if(user.role == 'Patient'){
      const patient = await sequelize.models.patient.findOne({
        where: {userId: user.id},
      });
      const doctor = await sequelize.models.doctor.findOne({
        where: {id: patient.doctorId},
      })
      res.render('myprofile', {
        user: req.session.user,
        patient,
        doctor,
      });
    } else if(user.role == 'Administrator'){
      res.render('myprofile', {
        user,
      })
    }
  }catch (error) {
    console.error('Error fetching profile details:', error);
    res.status(500).send('Server error - myprofile');
  }

  
});

module.exports = router;
