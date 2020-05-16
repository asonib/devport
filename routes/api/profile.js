const express = require('express');
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const router = express.Router();

require('../../models/Profile');
require('../../models/Users');
const Profile = mongoose.model('profile');
const Users = mongoose.model('user');

// @route : GET api/profile/me
// @desc : something
// @access : Public
router.get('/me', auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({_id : req.user}).populate('user', ['name', 'avatar']);

        if(!profile){
            return res.status(401).json({msg : 'No Profile found'});
        }
        return res.status(200).json(profile);
    }catch(err){
        console.log('Server Error');
        res.status(401).json({ err });
    }
    

})

module.exports = router;