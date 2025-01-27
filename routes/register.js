const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize');
const bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
    res.render('register', {
      user: req.session.user
    });
});

router.post('/', async (req, res) => {
    const name = req.body.name;
    const lastname = req.body.lastname;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const phone = req.body.phone;
    const username = req.body.user;
    const pass = req.body.password;
    const user = await sequelize.models.user.findOne({where: {username}});
    if(!user){ // username not in use
      const password = await bcrypt.hash(pass, 10);
      const newUser = await sequelize.models.user.create({username, password, role: 'Patient'}); // añadimos el role porque los que se registran son directamente pacientes
      req.session.user = { username: newUser.username, id: newUser.id };
      req.session.message = "Account created successfully!"
      
      const doctors = await sequelize.models.doctor.findAll();
      
      if (doctors.length > 0) { //doctors available in db
        const randomIndex = Math.floor(Math.random() * doctors.length); // doctor aleatorio
        const doctorAssigned = doctors[randomIndex]; 
        console.log('Doctor assigned:', doctorAssigned);
        const newPatient = await sequelize.models.patient.create({
          name: name, 
          lastname: lastname,
          dob: dob,
          phone: phone,
          gender: gender,
          userId : newUser.id,
          doctorId: doctorAssigned.id,
        }); 
        res.redirect("/login");

      } else { //no doctors
        console.log('No doctors found in the database.');
        req.session.error = "No available doctors. Please try again later...";
        res.redirect("/register");
      }
      
    } else { //usetname in use
      req.session.error = "Username already in use.";
      res.redirect("/register");
    }
});

module.exports = router;
