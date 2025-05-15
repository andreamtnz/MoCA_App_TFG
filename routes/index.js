const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user && req.session.user.role){
    return res.redirect('/myprofile');
  }else{
  res.render('index', {user:req.session.user});
  }
});


module.exports = router;
