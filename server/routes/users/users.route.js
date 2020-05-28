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

module.exports = router;
