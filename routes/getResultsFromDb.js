// routes/getResultsFromDb.js
const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize');

router.get('/:id/download', async (req, res) => {
  const testId = req.params.id;

  try {
    const testResult = await sequelize.models.testResult.findOne({
      where: { id: testId },      
    });

    if (!testResult || !testResult.zip_file) {
      return res.status(404).send("File not found");
    }

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="test-${testId}.zip"`);
    res.send(testResult.zip_file); // Enviamos el buffer ZIP
    console.log("Sending file...")
  } catch (error) {
    console.error("Error al descargar el archivo ZIP:", error);
    res.status(500).send("Error del servidor");
  }
});

module.exports = router;

  