const express = require('express');
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const router = express.Router();

require('../../models/Profile');
require('../../models/Users');
const Profile = mongoose.model('profile');
const Users = mongoose.model('user');

// @route : GET api/profile/me
// @desc : something
// @access : Public
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ _id: req.user }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(401).json({ msg: 'No Profile found' });
        }
        return res.status(200).json(profile);
    } catch (err) {
        console.log('Server Error');
        res.status(401).json({ err });
    }


});

router.post('/', [auth,
    check('status').not().isEmpty(),
    // password must be at least 5 chars long
    check('skills').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const {
        company,
        handle,
        website,
        location,
        status,
        skills,
        bio,
        githubusername,
        youtube,
        twitter,
        linkedin,
        facebook,
        instagram
    } = req.body;

    profileDetails = {};
    profileDetails.user = req.user;
    if (company) profileDetails.company = company;
    if (handle) profileDetails.handle = handle;
    if (website) profileDetails.website = website;
    if (location) profileDetails.location = location;
    if (status) profileDetails.status = status;
    if (skills) profileDetails.skills = skills;
    if (bio) profileDetails.bio = bio;
    if (githubusername) profileDetails.githubusername = githubusername;

    profileDetails.social = {}
    if (youtube) profileDetails.social.youtube = youtube;
    if (twitter) profileDetails.social.twitter = twitter;
    if (linkedin) profileDetails.social.linkedin = linkedin;
    if (facebook) profileDetails.social.facebook = facebook;
    if (instagram) profileDetails.social.instagram = instagram;
    console.log(profileDetails);
    try {
        let profile = await Profile.findOne({ user: req.user });
        if (profile) {
            const profile = await (await Profile.findOneAndUpdate({ user: req.user }, { $set: profileDetails }, { new: true }));
            return res.status(200).json(profile);
        }
        profile = new Profile(profileDetails);
        await profile.save();
        return res.status(200).json(profile);
    } catch (err) {
        console.log('Server Error');
        res.status(400).json(err.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        if (!profiles) return res.json('No Profiles Found');
        return res.status(200).json(profiles);
    } catch (err) {
        console.log('Server Error');
        res.json(err.message);
    }

});

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if (!profile) return res.json('No Profiles Found');
        return res.status(200).json(profile);
    } catch (err) {
        console.log('Server Error');
        res.json(err.message);
    }
});

router.delete('/', auth, async (req, res) => {
    try {
        await Profile.findOneAndRemove({ user: req.user });
        await Users.findOneAndRemove({ _id: req.user });
        return res.json({ msg: 'User Deleted' });
    } catch (err) {
        console.log('Error Deleting');
        res.send(err.message);
    }
});

router.put('/experience', [auth,
    check('title').not().isEmpty(),
    // username must be an email
    check('company').not().isEmpty(),
    // password must be at least 5 chars long
    check('from').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const new_experience = {
        title: title,
        company: company,
        location: location,
        from: from,
        to: to,
        current: current,
        description: description
    }

    try{
        const exp = await Profile.findOne({user: req.user});
        exp.experience.unshift(new_experience);

        await exp.save();
        return res.send(exp);
    }catch(err){
        console.log('Error Putting Data');
        res.send(err.message);
    }

})

module.exports = router;