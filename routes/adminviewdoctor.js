const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize'); 

// Verificación de que el usuario es un doctor
function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'Administrator') {
      next(); // Si es admin, continuar
  } else {
      return res.redirect('/login'); // Si no, redirigir al inicio de sesión
  }
}

// Ruta para mostrar los detalles del doctor junto con sus pacientes
router.get('/:id', isAdmin, async (req, res) => {
  const doctorId = req.params.id;
  
  try {
   
    // Obtener la información del doctor por ID
    const doctor = await sequelize.models.doctor.findOne({
       where: { id: doctorId },       
    });

    if (!doctor) {
      return res.redirect("/viewdoctors");
    } else{

    const userDoctor = await sequelize.models.user.findOne({
      where: {id: doctor.userId},      
    });

    // Obtener los pacientes asociados a este doctor
    const patients = await sequelize.models.patient.findAll({ where: { doctorId: doctorId } });


    // Renderizar la vista con la información del user (administrador en este caso), doctor y sus pacientes
    res.render('adminviewdoctor', {
      user:req.session.user,
      doctor,
      userDoctor,
      patients });
    }

  } catch (error) {
    console.error('Error fetching doctor details:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
