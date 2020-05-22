const JwtStrategy = require("passport-jwt").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

// @fileDesc: Middleware that checks if user is logged in 
  // through JWT in cookies

function extractJwtFromCookies() {
  return (req) => {
    let token;
  
    if (req && req.cookies) {
      token = req.cookies['jwt'];
    }
  
    return token;
  }
}
  
module.exports = passport => {
  const opts = {};
  opts.jwtFromRequest = extractJwtFromCookies();
  opts.secretOrKey = keys.secretOrKey;

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
