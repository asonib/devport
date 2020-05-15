const express = require('express');
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
});

module.exports = router;