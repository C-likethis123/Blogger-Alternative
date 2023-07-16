# OAuth flows

There are three types of flows I can use

## 2 legged OAuth

How I would use it: the frontend communicates with Google Oauth.

React frontend sends a token request.
Auth server validates the app and presents login form to the user
User logs in and auth server validates credentials
Auth server allows access to the user.

Auth server sends the token to the React app directly.

When to use this:
- For login-only use cases

Why is it bad:
- In the first step when the react app sends the token request, it would expose the client ID
- This flow directly returns tokens to the browser

Since Blog Alt is using Google Oauth for purposes beyond logging in, this is not a suitable flow.

## 3 legged OAuth

How I would use it: I have a frontend, backend, and the Google OAuth server.

Frontend initiates a login process by sending /login to the backend, redirects to the auth server
Auth server validates client
Login form is shown to the user, user sends credentials to auth server
Auth server validates user and asks users permissions for scopes, user allows access
Auth server sends auth code to the backend

Backend makes a request for the token using the client ID, client secret (stored in backend) and auth code provided to the frontend.
Auth server validates the client ID, secret and auth code, and provides an access token and refresh token
Backend stores access token and refresh token and uses them to make requests to the Google Blogger API

Backend sends requests back to the frontend.

When would I use this:
- When the resource server and authorisation server is different.

This is better than 2 legged OAuth since the client ID and secret is not exposed to the frontend.

## Server to server

Backend wants to use services at this server
Backend enters credentials and receives a token.
Backend uses token to validate requests.

When would I use this: 
- When backend is not acting on behalf of the user
- Server to server interactions that must run in the background, without immediate interaction with a user.
- Permissions are granted directly to the application itself.

## Conclusion

Implement 3-legged OAuth

## Resources
[Using OAuth2.0 to access Google APIs](https://developers.google.com/identity/protocols/oauth2#5.-refresh-the-access-token,-if-necessary.)
[Passport.js](https://www.passportjs.org/concepts/authentication/google/)