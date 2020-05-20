const express = require("express");
const router = express.Router();

const validateRegisterInput = require("../../validation/auth/register.validation");
const User = require("../../models/User");

// @route POST /auth/register
// @desc Register user
// @access Public
router.post("/", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      
      newUser.save()
        .then(user => {
          user.password = null;
          res.json(user);
        })
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;
