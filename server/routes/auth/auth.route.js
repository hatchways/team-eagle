const express = require('express');
const router = express.Router();
const passport = require('passport');

const validateLoginInput = require('../../validation/auth/login.validation');
const validateRegisterInput = require('../../validation/auth/register.validation');

const User = require('../../models/user');

// @route:  POST /auth/register
// @desc:   Register user and return response that has cookie, and json user
// @access: Public
router.post('/register', (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      const newUser = new User({ name, email, password });

      newUser
        .save()
        .then((user) => {
          const payload = { id: user.id };
          const token = user.signJWT(payload);

          user.password = null;

          res.cookie('jwt', token, { httpOnly: true, secure: true }).json(user);
        })
        .catch((err) => console.log(err));
    }
  });
});

// @route:  POST /auth/login
// @desc:   Login user and return response that has cookie, and json user
// @access: Public
router.post('/login', (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ message: 'Incorrect credentials' });
    }

    const isMatch = user.checkPassword(password);
    if (isMatch) {
      const payload = { id: user.id };
      const token = user.signJWT(payload);

      user.password = null;

      res.cookie('jwt', token, { httpOnly: true, secure: true }).json(user);
    } else {
      res.status(400).json({ message: 'Incorrect credentials' });
    }
  });
});

// @route:  DELETE /auth/logout
// @desc:   Logout user and delete jwt from request cookies
// @access: Private
router.delete(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // We know that jwt is in cookies since this is a protected route
    // (a check happens through passport)
    res.clearCookie('jwt');

    return res.json({ success: true });
  }
);

module.exports = router;
