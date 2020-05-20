const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateLoginInput = require("../../validation/auth/login.validation");

const User = require("../../models/User");

// @route POST /auth/login
// @desc Login user and return JWT token
// @access Public
router.post("/", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "Incorrect credentials" });
    }

    // Check password
    user.checkPassword(password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(400).json({ message: "Incorrect credentials" });
      }
    });
  });
});

module.exports = router;
