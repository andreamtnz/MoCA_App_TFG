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
    if(!user){
      const password = await bcrypt.hash(pass, 10);
      const newUser = await sequelize.models.user.create({username, password, role: 'Patient'}); // añadimos el role porque los que se registran son directamente pacientes
      req.session.user = { username: newUser.username, id: newUser.id };
      req.session.message = "Account created successfully!"
      
      const newPatient = await sequelize.models.patient.create({
        name: name, 
        lastname: lastname,
        dob: dob,
        phone: phone,
        gender: gender,
        userId : newUser.id,
        doctorId: 1}); // de primeras se le asignará al doctor base
      res.redirect("/restricted");
    } else {
      req.session.error = "Ya existe ese username";
      res.redirect("/register");
    }
});

module.exports = router;
