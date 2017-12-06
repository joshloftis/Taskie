const bCrypt = require('bcrypt-nodejs');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');


  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.User.findById(id).then((user) => {
      done(null, user && user.get({plain:true}));
    }).catch(done);
  });

  passport.use(
    new GoogleStrategy({
      clientID: process.env.Google_ClientID,
      clientSecret: process.env.Google_ClientSecret,
      callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
      db.User.findOne({
        where: {
          externalId: profile.id
        }
      }).then((currentUser) => {
        if (currentUser) {
          done(null, currentUser);
        } else {
          db.User.create({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            externalId: profile.id,
            email: profile.emails[0].value,
            thumbnail: profile._json.image.url
          }).then((newUser) => {
            done(null, newUser.get({plain:true}));
          }).catch(done);
        }
      });
    })
  );

  passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    }, (req, email, password, done) => {
      const generateHash = (password) => {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };
      db.User.findOne({
        where: {
          login: email
        }
      }).then((err, user) => {
        if (err)
          return done(err);
        if (user) {
          return done(null, false, { message: 'That username is already in use.' });
        } else {
          const userPassword = generateHash(password);
          const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            login: email,
            password: userPassword,
            email: email
          };
          db.User.create(data).then((newUser) => {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    }));

  passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    }, (req, email, password, done) => {
      var isValidPassword = (userpass, password) => {
        return bCrypt.compareSync(password, userpass);
      };
      db.User.findOne({
        where: {
          login: email
        }
      }).then((user) => {
        if (!user)
          return done(null, false, { message: 'Incorrect username.' });
        if (!isValidPassword(user.password, password))
           return done(null, false, { message: 'Incorrect password.' });
        return done(null, user);
      }).catch((err) => {
        return done(err);
      });
    }));
