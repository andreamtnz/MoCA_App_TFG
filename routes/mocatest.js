// routes/mocatest.js
const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize'); 

router.get('/', async (req, res) => {
    const user = req.session.user;
    res.render('mocatest', { 
       user,
    });
    
});


module.exports = router;

