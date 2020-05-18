const express = require('express');
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const router = express.Router();

require('../../models/Users');
const Users = mongoose.model('user');
require('../../models/Post');
const Post = mongoose.model('post');

// @route   POST api/posts/
// @desc    Tests post route
// @access  Public
router.post('/', [auth,
  check('text').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const user = await Users.findById({_id: req.user}).select('-password');
    const {
      text,
      name,
      avatar
    } = req.body;
    const new_post = {
      text: text,
      name: user.name,
      avatar: user.avatar,
    }
    new_post.user = req.user;
    const post = new Post(new_post);
    await post.save();

    res.json(post);
  } catch (error) {
    console.log('Server Error');
    res.send(error.message);
  }

});
module.exports = router;