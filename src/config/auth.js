const passport = require("passport");
const person = require("../model/person.js");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
    new LocalStrategy(async (USERNAME, PASSWORD, done) => {
      try {
        // console.log("Received Credentials: ", USERNAME, PASSWORD);
        const user = await person.findOne({ username: USERNAME });
        if (!user) {
          return done(null, false, { message: "Incorrect Username." });
        }
        const isPasswordMatch = user.password === PASSWORD ? true : false;
        if (isPasswordMatch) {
          return done(null, user);
        }else{
          return done (null, false, {message: 'password incorrect.'});
        }
      } catch (err) {
        return done(err);
      }
    })
  );

module.exports = passport;