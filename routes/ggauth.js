const express = require('express')
var sv_profiles = require('../models/sv_profile');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const router = express.Router()


passport.use(new GoogleStrategy({
    clientID: "178602012133-er3a71j1c0p20eaba78t4viuub3694k6.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/ggauth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        const authId = 'google:' + profile.id;
        sv_profiles.findOne({ 'authId': authId })
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                new sv_profiles({
                    authId: authId,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                }).save()
                    .then(user => done(null, user))
                    .catch(err => done(err, null));
            });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    sv_profiles.findById(id)
        .then(user => done(null, user))
        .catch(err => done(err, null));
});

router.get('/google',
    passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    })

);

router.get('/google/callback',
    passport.authenticate('google', { successRedirect: '/', failureRedirect: '/auth/login' }));

module.exports = router;