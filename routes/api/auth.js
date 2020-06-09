const express = require('express');
const keys = require('../../config/keys');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');
const router = express.Router();

require('../../models/Users');
const Users = mongoose.model('user');

// @route : GET api/auth
// @desc : something
// @access : Public
router.get('/', auth, async (req, res) => {
    console.log(req.user);
    const details = await Users.findById({_id: req.user}).select('-password');
    console.log(details);
    return res.send(details);
});

router.post('/', [ 
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isString()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const user = await Users.findOne({email: req.body.email});
    if(!user){
        return res.status(422).json({errors: [{ msg: "No User with Email Exists" }]});
    }
    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    if(!isMatch){
        return res.status(422).json({errors: [{ msg: "Invalid Credentials" }]});
    }
    const payload = {
        id: user._id
    }
    jwt.sign(payload, keys.KeysAccess.jwtSecret, {expiresIn: 360000}, (err, token) => {
        if(err) throw err;
        res.json({ token });
    });
});

module.exports = router;