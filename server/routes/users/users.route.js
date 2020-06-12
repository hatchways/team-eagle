const express = require('express');
const passport = require('passport');
const router = express.Router({ mergeParams: true });
const upload = require('../polls/utils');
const User = require('../../models/user');

// @route:  GET /users/current
// @desc:   Find current logged in user and return it
// @access: Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const currUser = req.user;

    res.json(currUser);
  }
);

// @route: GET /users/active
// @desc: Mark the current user as active
// @access: Private
router.get(
  '/active',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const user = req.user;
    user.makeActive();
    return res.json(user);
  }
);

// @route: GET /users/deactive
// @desc: Mark the current user as deactive
// @access: Private
router.get(
  '/disactive',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const user = req.user;
    user.makeDisactive();
    return res.json(user);
  }
);

// @route: POST /users/changePic
// @desc: Change the profile picture of the url, by uploading through S3
// @access: Private
router.post(
  '/changePic',
  passport.authenticate('jwt', { session: false }),
  upload.any(),
  (req, res) => {
    console.log(req.files);
    const user = req.user;
    User.findById(user._id, (err, user) => {
      if (err) return res.status(400).json({ error: err });
      user.changePicture(req.files[0].location);
    });
    return res.status(200).json({ status: 'ok' });
  }
);

module.exports = router;
