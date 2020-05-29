const express = require('express');
const passport = require('passport');
const router = express.Router({ mergeParams: true });

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

module.exports = router;
