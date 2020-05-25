const express = require('express');
const router = express.Router();

const validateLoginInput = require('../../validation/auth/login.validation');

const User = require('../../models/User');

// @route:  POST /auth/login
// @desc:   Login user and return response that has cookie, and json user
// @access: Public
router.post('/', (req, res) => {
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
      const payload = { id: user._id };
      const { token, tokenExpiration } = user.signJWT(payload);
      const options = {
        expires: new Date(Date.now() + tokenExpiration * 24 * 60 * 60 * 1000),
        httpOnly: true, // Prevent cookies from being accessed client side
      };
      if (process.env.NODE_ENV === 'production') {
        options.secure = true; // Only send cookies with https protocol
      }

      user.password = null;

      res.cookie('jwt', token, options).json(user);
    } else {
      res.status(400).json({ message: 'Incorrect credentials' });
    }
  });
});

module.exports = router;
