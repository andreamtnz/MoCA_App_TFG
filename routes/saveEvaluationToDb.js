const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize');

function isDoctor(req, res, next) {
  if (req.session.user && req.session.user.role === 'Doctor') {
      next(); // Si es doctor, continuar
  } else {
      return res.redirect('/login'); // Si no, redirigir al inicio de sesión
  }
}

router.post('/:id/evaluate', isDoctor, async (req, res) => {
    const testId = req.params.id;
    const { evaluation } = req.body;
  
    try {
      const test = await sequelize.models.testResult.findByPk(testId);
      if (!test) return res.status(404).json({ error: "Test not found" });
  
      test.evaluation = evaluation;
      await test.save();
  
      res.json({ message: "Evaluación guardada correctamente" });
    } catch (err) {
      console.error("Error al guardar evaluación:", err);
      res.status(500).json({ error: "Error del servidor" });
    }
  });
  

  module.exports = router;