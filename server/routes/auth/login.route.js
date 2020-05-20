const express = require("express");
const router = express.Router();

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
    const isMatch = user.checkPassword(password);
    if (isMatch) {
      const payload = {
        id: user.id,
      };

      const token = user.signJWT(payload);
      res
      .cookie("jwt", token, { httpOnly: true, secure: true })
      .json({
        success: true,
        data: {
          user
        }
      });
    } else {
      return res.status(400).json({ message: "Incorrect credentials" });
    }
  });
});

module.exports = router;
