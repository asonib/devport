const express = require('express');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Users = require('../../models/Users');

// @route : GET api/users
// @desc : something
// @access : Public
router.post('/', [
    check('name').isString,
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
  ], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const {name, email, password} = req.body;
    try{
        let user = await Users.findOne({email: email});
        if(user){
            return res.status(401).json({errors: [{msg: 'Users alreaddy Exist'}]});
        }
        const avatar = gravatar.url(email, {s: "200", d: "mm", r: "pg"});

        // const salt = await bcrypt.genSalt(10);
        // const hash = await bcrypt.hash(password, salt);

        const new_user = {
            name: name,
            email: email,
            password: password,
            avatar: avatar
        };

        user = new Users(new_user);
        await user.save().then(() => {
            console.log('User Saved!');
        }).catch((err) => {
            console.log('error saving to database')
        });

        console.log(user);
        res.send('User Registered');

    }catch(err){
        console.log('server error', err);
    }
});

module.exports = router;