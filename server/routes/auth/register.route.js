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
          const payload = { id: user._id };
          const { token, tokenExpiration } = user.signJWT(payload);
          const options = {
            expires: new Date(
              Date.now() + tokenExpiration * 24 * 60 * 60 * 1000
            ),
            httpOnly: true, // Prevent cookies from being accessed client side
          };
          if (process.env.NODE_ENV === 'production') {
            options.secure = true; // Only send cookies with https protocol
          }

          user.password = null;

          res.cookie('jwt', token, options).json(user);
        })
        .catch((err) => console.log(err));
    }
  });
});

module.exports = router;
