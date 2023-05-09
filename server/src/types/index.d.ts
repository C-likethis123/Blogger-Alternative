import type { Credentials, OAuth2Client } from 'google-auth-library';
declare global {
    namespace Express {
        export interface Request {
            oauth2Client?: OAuth2Client;
        }
        export interface User {
            id: string;
            tokens: Credentials;
        }
    }
}