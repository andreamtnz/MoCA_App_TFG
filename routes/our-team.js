// routes/our-team.js
const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize');



// Ruta para mostrar la página "Our Team"
router.get('/', async (req, res) => {
    
    try{
        if(req.session.user && req.session.user.role){
            return res.redirect('/myprofile');
        }
        // Busca todos los doctores en la base de datos
        const doctors = await  sequelize.models.doctor.findAll();
        
        res.render('our-team', { // Renderizamos la vista 'our-team.ejs'
            user:req.session.user,
            doctors: doctors
        });  

    } catch (error){
        console.error('Error fetching doctors: ', error);
        res.status(500).send('Error fetching doctors');
    }
});

module.exports = router;  // Exportamos el router


  