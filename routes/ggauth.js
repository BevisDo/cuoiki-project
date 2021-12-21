const express = require('express')
var pk_profiles = require('../models/pk_profile');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const router = express.Router()
const jwt = require('jsonwebtoken')



passport.use(new GoogleStrategy({
    clientID: "178602012133-er3a71j1c0p20eaba78t4viuub3694k6.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/ggauth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        const authId = 'google:' + profile.id;
        pk_profiles.findOne({ 'authId': authId })
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                new pk_profiles({
                    authId: authId,
                    username: profile.displayName,
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

router.get('/google/callback', passport.authenticate('google', { session: false }),
    async function (req, res) {
        // console.log(req.user.email)

        const usergg = await pk_profiles.findOne({ 'email': req.user.email })

        const accessTokengg = jwt.sign({ userId: usergg._id }, process.env.ACCESS_TOKEN_SECRET)
        res.cookie('token', accessTokengg)
        // return res.json({ success: true, message: 'Login thanh cong', accessTokengg })
        res.redirect('/')
    }
);
// router.get('/google/callback', passport.authenticate('google'), function (req, res) {
//     res.cookie('token', jwt.sign({ userId: sv_profiles._id }, process.env.ACCESS_TOKEN_SECRET), 1)
// });

module.exports = router;