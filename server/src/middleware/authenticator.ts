import { Request, Response, NextFunction } from 'express';
import { google } from 'googleapis';
import UserModel from 'src/models/user';

export default function checkAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        // initialise a GoogleOAuth client if it's not present
        if (!req.oauth2Client) {
            const oauth2Client = new google.auth.OAuth2(
                process.env.GOOGLE_OAUTH_CLIENT_ID,
                process.env.GOOGLE_OAUTH_CLIENT_SECRET,
                "http://localhost:8000/oauth/redirect/google",
            );
            const { tokens } = req.user;
            oauth2Client.setCredentials(tokens);
            oauth2Client.on('tokens', (tokens) => {
                if (tokens.refresh_token) {
                    console.log(tokens.refresh_token);
                    UserModel.findOneAndUpdate({id: req.user?.id}, {
                        accessToken: tokens.access_token,
                        refreshToken: tokens.refresh_token,
                        dateAdded: Date.now()
                    });
                } else {
                    UserModel.findOneAndUpdate({id: req.user?.id}, {
                        accessToken: tokens.access_token,
                        dateAdded: Date.now()
                    })
                }
            })
            req.oauth2Client = oauth2Client;
        }
        return next();
    }
    return res.status(401).json({ message: "User is not authenticated!" });
}
