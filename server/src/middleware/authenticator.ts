import { Request, Response, NextFunction } from 'express';
import { google } from 'googleapis';
import type { Credentials } from 'google-auth-library';

type User = {
   id: string;
   tokens: Credentials;
}

export default function checkAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        // initialise a GoogleOAuth client
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_OAUTH_CLIENT_ID,
            process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            "http://localhost:8000/oauth/redirect/google",
        );
        const { tokens } = req.user as User;
        oauth2Client.setCredentials(tokens);
        req.oauth2Client = oauth2Client;
        return next();
    }
    return res.status(401).json({message: "User is not authenticated!"});
}
