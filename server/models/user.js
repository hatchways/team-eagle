const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const Schema = mongoose.Schema; // Create Schema

// Schema for user Model
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) {
  // Hash password when ordered to create or update password
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.signJWT = function (payload) {
  const expiresIn = 31556926; // 1 year in seconds
  return {
    token: jwt.sign(payload, keys.secretOrKey, { expiresIn }),
    tokenExpiry: expiresIn,
  };
};

module.exports = User = mongoose.model('users', UserSchema);
