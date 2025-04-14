// routes/mocatest.js
const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize'); 

// Verificación de que el usuario es un doctor
function isPatient(req, res, next) {
    if (req.session.user && req.session.user.role === 'Patient') {
        next(); // Si es paciente, continuar
    } else {
        res.redirect('/login'); // Si no, redirigir al inicio de sesión
    }
  }

router.get('/', isPatient, async (req, res) => {
    const user = req.session.user;
    res.render('mocatest', { 
       user,
    });
    
});


module.exports = router;

