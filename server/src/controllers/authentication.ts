import Controller from "./controller";
import express, {Request, Response, NextFunction} from "express";
import passport from "passport";
import dotenv from 'dotenv';
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import path from "path";
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
function(accessToken, refreshToken, profile, cb) {
    // TODO: figure out what to do here
    return cb(null, profile);
}))

passport.serializeUser(function(user: User, cb) {
    console.log(user);
    process.nextTick(function(){
        return cb(null, {
            id: user.id,
            username: user.username,
        })
    })
})

passport.deserializeUser(function(user, cb) {
    process.nextTick(function(){
        return cb(null, user);
    })
})

function checkAuthenticated(req: Request, res: Response, next:NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("http://localhost:3000");
}

class AuthenticationController implements Controller {
    public router = express.Router();

    constructor() {
        this.router.get('/login/google', passport.authenticate("google", {
            scope: ["email"]
        }));
        this.router.get('/oauth/redirect/google', passport.authenticate("google", {
            successReturnToOrRedirect: 'http://localhost:3000/posts',
            failureRedirect: 'http://localhost:3000',
        }));
        this.router.post('/logout', function(req, res, next) {
            req.logout(function(err) {
                if (err) {
                    return next(err);
                }
                res.redirect('http://localhost:8000/login');
            })
        })
        this.router.get("/login", (req, res) => {
            res.sendFile(path.resolve(__dirname, '../../index.html'));
        });
    }

}

export default AuthenticationController;