const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize');
const bcrypt = require('bcrypt');



router.get('/', async(req, res) => {
  try{
    const user = req.session.user;

    if(!user){
        return res.redirect('/login');
    }

    if (user.role == 'Doctor'){
      const doctor = await sequelize.models.doctor.findOne({
        where: {userId: user.id},
      });
      return res.render('update-profile', {
        user: req.session.user,
        doctor,
      });

    } else if(user.role == 'Patient'){
      const patient = await sequelize.models.patient.findOne({
        where: {userId: user.id},
      });
      return res.render('update-profile', {
        user: req.session.user,
        patient,
      });
    }


  }catch (error) {
    console.error('Error fetching profile details:', error);
    res.status(500).send('Server error - update-profile');
  }

  
});

router.post('/', async (req, res)=>{
    try{
        const user = req.session.user;    
        const username = req.body.user;
        const pass = req.body.password;
        const confirmpass = req.body.confirmpassword;

        req.session.message = req.session.message || [];
        req.session.error = req.session.error || [];


        if (pass || confirmpass){ // one of the fields is filled

          if (pass && confirmpass) { // both password fields are filled
            if (pass !== confirmpass) {
              //req.session.error = "Passwords do not match.";
              return res.redirect("/update-profile");
              }
            else {
              const hashedPassword = await bcrypt.hash(pass, 10);
              await sequelize.models.user.update({ 
                password: hashedPassword },
                { where: { id: user.id } });
                req.session.message.push("Password updated successfully!");
            }
          } else {
            req.session.error = "To change the password you must fill both fields.";
            return res.redirect("/update-profile");
          }

        }
        
        if(username && username!=user.username ){ // username has not been changed
            const userInUse = await sequelize.models.user.findOne({
                where: {username: username}
            });

            if (!userInUse){ //username not in use
                try{
                    await sequelize.models.user.update({
                        username: username,
                    },
                    {where: {id: user.id}} );
                    req.session.message.push("Username updated successfully!");
                    user.username = username;
                }catch(validationError){
                    req.session.error.push("Invalid username format.");
                    return res.redirect("/update-profile");
                }
            }
            else{
              req.session.error.push("Username already in use.");
              return res.redirect("/update-profile");
            }
            
        }

        

        if(user.role == "Patient"){
            const name = req.body.name;
            const lastname = req.body.lastname;
            const dob = req.body.dob;
            const gender = req.body.gender;
            const phone = req.body.phone;
            const updateFields = {};

            if (name) updateFields.name = name;
            if (lastname) updateFields.lastname = lastname;
            if (dob) updateFields.dob = dob;
            if (phone) updateFields.phone = phone;
            if (gender) updateFields.gender = gender;

            if (Object.keys(updateFields).length > 0) {
                await sequelize.models.patient.update(updateFields, { where: { userId: user.id } });
                req.session.message.push("Profile updated successfully!");
            }
                    
        
        }

        if (user.role == "Doctor"){
            const name = req.body.name;
            const lastname = req.body.lastname;
            const license_number = req.body.license_number;
            const specialty = req.body.specialty;
            const image = req.body.image;
            const description = req.body.description;

            const updateFields = {};

            if(name) updateFields.name = name;
            if(lastname) updateFields.lastname = lastname;
            if(specialty) updateFields.specialty = specialty;
            if(license_number) updateFields.license_number = license_number;
            if(description) updateFields.description = description;
            if(image) updateFields.image = image;

            if (Object.keys(updateFields).length > 0) {
                await sequelize.models.doctor.update(updateFields, { where: { userId: user.id } });
                req.session.message.push("Profile updated successfully!");
            }
               

        }

        if (req.session.message.length === 0) {
          delete req.session.message;
      }
      if (req.session.error.length === 0) {
          delete req.session.error;
      }
      
        

      
     
    res.redirect("/update-profile");
    
    }catch (error) {
        console.error('Error fetching profile details:', error);
        res.status(500).send('Server error - update-profile');
      }

       
       
})

module.exports = router;
