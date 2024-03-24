import Controller from "./controller";
import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import type { Credentials } from "google-auth-library";
import UserModel from "src/models/user";

type User = {
    id: string;
    tokens: Credentials;
}
dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: "/oauth/redirect/google"
},
    function (accessToken, refreshToken, profile, cb) {
        /** TODO: implement refresh token logic
         * 1. Find entry with email address. Update with access_token and profile
         * 2. Otherwise, add the user inside
         */
        UserModel.findOneAndUpdate({ id: profile.id }, {
            id: profile.id,
            access_token: accessToken,
            refresh_token: refreshToken,
        }, {
            upsert: true,
        }).then(() => {
            const user = {
                id: profile.id,
                tokens: {
                    access_token: accessToken,
                    refresh_token: refreshToken,
                }
            }
            return cb(null, user);
        }).catch(err => console.log(err));
    }))

passport.serializeUser(function (user: User, cb) {
    process.nextTick(function () {
        UserModel.findOne({ id: user.id })
            .then(user => {
                console.log('serialise', user.refresh_token);
                return cb(null, {
                    id: user.id,
                    tokens: {
                        access_token: user.access_token,
                        refresh_token: user.refresh_token
                    }
                })
            }).catch(err => console.error(err))
    })
})

passport.deserializeUser(function (user: User, cb) {
    process.nextTick(function () {
        return cb(null, user);
    })
})

class AuthenticationController implements Controller {
    public router = express.Router();

    constructor() {
        this.router.get('/login/google', passport.authenticate("google", {
            scope: ["email", "profile", "https://www.googleapis.com/auth/blogger"],
            accessType: 'offline'
        }));
        this.router.get('/oauth/redirect/google', passport.authenticate("google", {
            successReturnToOrRedirect: '/posts',
            failureRedirect: '/',
        }));
        this.router.post('/logout', function (req, res, next) {
            req.session.destroy(() => {
                res.clearCookie('connect.sid', {
                    secure: false,
                    httpOnly: false,
                });
                return res.redirect("/");
            });
        });
    }

}

export default AuthenticationController;