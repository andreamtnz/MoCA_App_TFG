// routes/viewdoctors.js
const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize');

router.get('/', async (req, res) => {
    
    
    try{
        // Busca todos los doctores en la base de datos
        const doctors = await  sequelize.models.doctor.findAll();
        res.render('viewdoctors', {
            user:req.session.user,
            
            doctors: doctors
        });  // Renderizamos la vista 'viewdoctors.ejs'
    } catch (error){
        console.error('Error fetching doctors: ', error);
        res.status(500).send('Error fetching doctors');
    }
});

module.exports = router;  // Exportamos el router


  