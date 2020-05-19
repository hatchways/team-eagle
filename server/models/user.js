const mongoose = require("mongoose");
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
  // create new hashed password when ordered to create or update password
  if (!this.isModified("password")) {
    return next();
  }

  this.password = bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      return hash
    })
  });
  
  next();
});

module.exports = User = mongoose.model("users", UserSchema);