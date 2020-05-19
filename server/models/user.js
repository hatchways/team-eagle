const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const Schema = mongoose.Schema;// Create Schem

// Schema for user Model
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", function (next) {
  // hash password when ordered to create or update password
  if (!this.isModified("password")) {
    return next();
  }
  
  const nonHashedPass = this.password;
  this.password = bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(nonHashedPass, salt, (err, hash) => {
      if (err) throw err;
      return hash;
    })
  });

  next();
});

module.exports = User = mongoose.model("users", UserSchema);