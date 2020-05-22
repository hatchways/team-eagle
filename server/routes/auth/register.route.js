const express = require('express');
const router = express.Router();

const validateRegisterInput = require('../../validation/auth/register.validation');
const User = require('../../models/User');

// @route:  POST /auth/register
// @desc:   Register user and return response that has cookie, and json user
// @access: Public
router.post('/', (req, res) => {
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

module.exports = router;
