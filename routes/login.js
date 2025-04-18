const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize');
const bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
  if(req.session.user && req.session.user.role){
    res.redirect('/myprofile');
  }else{
    res.render('login', {
      user: req.session.user
    });
  }
});



router.post('/', async (req, res) => {
  const username = req.body.user;
  const user = await sequelize.models.user.findOne({where: {username}});
  if(user){
    bcrypt.compare(req.body.pass, user.password, function(err, result){
      if (result){//Login y pass correcto
        req.session.user = {
          id: user.id,
          username: user.username,
          role: user.role
        };
        req.session.message = "Successful log in!"
        if(user.role == 'Patient'){
          res.redirect("/patient-viewtests");
        }
        if(user.role == 'Doctor'){
          res.redirect("/myprofile");
        }
        if(user.role == 'Administrator'){
          res.redirect("/viewdoctors");
        };
      } else {
        req.session.error = "Incorrect username or password.";
        res.redirect("/login");
      }
    });
  } else {
    req.session.error = "Incorrect username or password.";
    res.redirect("/login");
  }
});

module.exports = router;
