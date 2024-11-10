// routes/our-team.js
const express = require('express');
const router = express.Router();
//const Doctor = require('../sequelize/models/doctor.model'); // Importa el modelo Doctor

// Ruta para mostrar la página "Our Team"
router.get('/', async (req, res) => {
    const user = req.session.user;
    res.render('our-team', { user: user}); // Renderiza la vista EJS "our-team"
    
    /*try{
        // Busca todos los doctores en la base de datos
        const doctors = await  Doctor.findAll();
        res.render('our-team', {
            user:req.session.user,
            title: 'Our team',
            doctors: doctors
        });  // Renderizamos la vista 'our-team.ejs'
    } catch (error){
        console.error('Error fetching doctors: ', error);
        res.status(500).send('Error fetching doctors');
    }*/
});

module.exports = router;  // Exportamos el router


  