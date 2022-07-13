const passport = require('passport');
const googleStrategy = require('passport-google-oauth2').Strategy;
const kakaoStrategy = require('passport-kakao').Strategy;
const { Member } = require('../models');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
}, async (request, accessToken, refreshToken, profile, done) => {
    // console.log('profile: ', profile);s
    try {
        const exUser = await Member.findOne({
            where: { sns_id: profile.id, provider: 'google' },
        });
        if (exUser) {
            var google_user = {
                'user' : exUser,
                'accessToken' : accessToken
            }
            done(null, google_user);
        } else {
            const newUser = await Member.create({
                sns_id : profile.id,
                provider : 'google',
                name : profile.displayName,
            });
            var google_user = {
                'user' : newUser.dataValues,
                'accessToken' : accessToken
            }
            done(null, google_user); 
        }
    } catch (error) {
        console.error(error);
        done(error);
    }
}));

passport.use(new kakaoStrategy({
    clientID : process.env.KAKAO_CLIENT_ID,
    clientSecret : process.env.KAKAO_CLIENT_SECRET,
    callbackURL : '/auth/kakao/callback',
}, async (request, accessToken, refreshToken, profile, done) =>{

    // console.log('profile: ', profile);
    try {
        const exUser = await Member.findOne({
            where: { sns_id: profile.id, provider: 'kakao' },
        });
        if (exUser) {
            var kakao_user = {
                'user' : exUser,
                'accessToken' : accessToken
            }
            done(null, kakao_user);
        } else {
            const newUser = await Member.create({
                sns_id : profile.id,
                provider : 'kakao',
                name : profile.displayName,
            });
            var kakao_user = {
                'user' : newUser.dataValues,
                'accessToken' : accessToken
            }
            done(null, kakao_user); 

        }
    } catch (error) {
        console.error(error);
        done(error);
    }
}));
module.exports = passport;

