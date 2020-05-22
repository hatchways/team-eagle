const express = require('express');
const passport = require('passport');
const router = express.Router();

// @route:  DELETE /auth/logout
// @desc:   Logout user and delete jwt from request cookies
// @access: Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // We know that jwt is in cookies since this is a protected route
    // (a check happens through passport)
    res.clearCookie('jwt');

    return res.json({ success: true });
  }
);

module.exports = router;
