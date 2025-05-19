const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize');
const bcrypt = require('bcrypt');


router.get('/', function(req, res, next) {
  if(req.session.user && req.session.user.role){
    res.redirect('/myprofile');
  }else{
    res.render('register', {
      user: req.session.user
    });
  }
    
});

router.post('/', async (req, res) => {
    const name = req.body.name;
    const lastname = req.body.lastname;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const phone = req.body.phone;
    const username = req.body.user;
    const pass = req.body.password;

    const usernameValidation = /^\w{3,}$/;
    if (!usernameValidation.test(username)) {
        req.session.error = "Username must have at least 3 characters and only contain letters, numbers, or underscores.";
        return res.redirect("/register");
    }

    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordValidation.test(pass)) {
        req.session.error = "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.";
        return res.redirect("/register");
    }
    
    const user = await sequelize.models.user.findOne({where: {username}});
    if(!user){ // username not in use
      
      const password = await bcrypt.hash(pass, 10);
      const newUser = await sequelize.models.user.create({username, password, role: 'Patient'}); // añadimos el role porque los que se registran son directamente pacientes
      req.session.user = { username: newUser.username, id: newUser.id };
      req.session.message = "Account created successfully!"
      
      const doctors = await sequelize.models.doctor.findAll();
      
      if (doctors.length > 0) { //doctors available in db
        const randomIndex = Math.floor(Math.random() * doctors.length); // random doctor 
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
      
    } else { //username in use
      req.session.error = "Username already in use.";
      res.redirect("/register");
    }
});

module.exports = router;
