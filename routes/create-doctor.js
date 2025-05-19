const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize');
const bcrypt = require('bcrypt');


const upload = require('../utils/upload');

// Verificación de que el usuario es un administrador
function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'Administrator') {
      next(); // Si es administrador, continuar
  } else {
      return res.redirect('/login'); // Si no, redirigir al inicio de sesión
  }
}


// Ruta para mostrar el formulario para crear un nuevo doctor
router.get('/', isAdmin, (req, res) => {
    res.render('create-doctor', {
        user: req.session.user 
    });
});

// Ruta para manejar la creación del doctor (POST)
router.post('/', isAdmin, upload.single('image'), async (req, res) => {
    const username = req.body.user;
    const pass = req.body.password;

    const { name, lastname, specialty, license_number, description } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const user = await sequelize.models.user.findOne({where: {username}});

    try {

        if(!user){ // si el username es válido

            const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (!passwordValidation.test(pass)) {
                req.session.error = "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.";
                req.session.message = null;
                return res.redirect("/create-doctor");
            }

            const usernameValidation = /^\w{3,}$/;
            if (!usernameValidation.test(username)) {
                req.session.error = "Username must have at least 3 characters and only contain letters, numbers, or underscores.";
                req.session.message = null;
                return res.redirect("/update-profile");
            }

            const password = await bcrypt.hash(pass, 10);
            const newUser = await sequelize.models.user.create({username, password, role: 'Doctor'}); // añadimos el role porque los que se registran son directamente pacientes
            req.session.message = "User created successfully!"
            
            const newDoctor = await sequelize.models.doctor.create({
              name: name, 
              lastname: lastname,
              specialty: specialty,
              license_number: license_number,
              description: description,
              image: imagePath,
              userId : newUser.id, // le asociamos al user que se ha creado
            }); 

            req.session.message = "Doctor created successfully!";
            return res.redirect("/viewdoctors"); //volvemos a viewdoctors
          } else {
            req.session.error = "Not valid username";
            res.redirect("/create-doctor");
          }

         
    } catch (error) {
        console.error('Error creating doctor:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
