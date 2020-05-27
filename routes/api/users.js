const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const normalize = require('normalize-url');
const router = express.Router();
const keys = require('../../config/keys');

require('../../models/Users');
const Users = mongoose.model('user');

// @route : GET api/users
// @desc : something
// @access : Public
router.post('/', [
    check('name').isString(),
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 6 })
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    console.log(req.body);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const avatar = normalize(gravatar.url(req.body.email, {s: "200", d: "mm", r: "pg"}), { forceHttps: true });

    const new_user = {
        name : req.body.name,
        email : req.body.email,
        password : hash,
        avatar : avatar
    }

    const user = new Users(new_user);
    user.save();

    const payload = {
        id: user._id
    }
    jwt.sign(payload, keys.KeysAccess.jwtSecret, {expiresIn: 360000}, (err, token) => {
        if(err) throw err;
        res.json({ token });
    });
});

module.exports = router;