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
  friendIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
  ],
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
  return jwt.sign(
    payload,
    keys.secretOrKey,
    { expiresIn: 31556926 } // 1 year in seconds
  );
};

UserSchema.methods.makeActive = function () {
  this.active = true;
  this.save();
};

UserSchema.methods.makeDisactive = function () {
  this.active = false;
  this.save();
};

UserSchema.methods.loginRegisterClientResponse = function () {
  const payload = { id: this._id };
  const token = this.signJWT(payload);
  const options = {
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true; // Only send cookies with https protocol
  }

  this.password = null;

  return {
    token,
    options,
  };
};

module.exports = User = mongoose.model('users', UserSchema);
