import Controller from "./controller";
import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

interface User {
    id: string;
    username: string;
}
dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: "/oauth/redirect/google"
},
    function (accessToken, refreshToken, profile, cb) {
        // TODO: figure out what to do here
        return cb(null, profile);
    }))

passport.serializeUser(function (user: User, cb) {
    console.log(user);
    process.nextTick(function () {
        return cb(null, {
            id: user.id,
        })
    })
})

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    })
})

class AuthenticationController implements Controller {
    public router = express.Router();

    constructor() {
        this.router.get('/login/google', passport.authenticate("google", {
            scope: ["email"]
        }));
        this.router.get('/oauth/redirect/google', passport.authenticate("google", {
            successReturnToOrRedirect: '/posts',
            failureRedirect: '/',
        }));
        this.router.post('/logout', function (req, res, next) {
            req.logout(() => {
                req.session.destroy(function (err) {
                    if (err) {
                        return next(err);
                    }
                    res.clearCookie('connect.sid');
                    res.redirect('/')
                })
            });
        });
    }

}

export default AuthenticationController;