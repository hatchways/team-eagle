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
      const payload = { id: user.id };
      const token = user.signJWT(payload);

      user.password = null;

      res.cookie('jwt', token, { httpOnly: true, secure: true }).json(user);
    } else {
      res.status(400).json({ message: 'Incorrect credentials' });
    }
  });
});

module.exports = router;
