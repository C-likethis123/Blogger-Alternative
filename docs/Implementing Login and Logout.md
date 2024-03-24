# Implementing Login and Logout

This is a blurb to record any findings while implementing login and logout.

## CORS

My initial setup was a frontend app hosted in localhost:3000, and a backend app hosted in localhost:8000.
The backend app had a CORS setup which whitelisted localhost:3000.

Serving the apps from different origins still posed issues, especially in the logout.
My logout has this follow:
1. Frontend calls "http://{backend_url}/logout", with the `withCredentials:true` option
2. Backend destroys the session using `req.session.destroy` or `req.logout` and clears the cookies. The `res.clearCookie` method in Express sets the `Set-Cookie` header, and removes the session cookie from the frontend.
3. Backend redirects users to frontend app.

By serving both frontend and backend in the same origin, there is no need to manage whitelisting of the frontend app.

## Redirects

TODO: Fix frontend not redirecting from backend

## Clearing cookies
TODO: Fix Safari cookies not cleared. It was cleared in Chrome though.
`req.logout()` removes the session information and the `user` object from the request, but does not clear the session cookie in the frontend app.

`req.session.destroy` and `res.clearCookie` is needed:
 ```javascript
 req.session.destroy(function (err) {
    if (err) {
        return next(err);
    }
    res.clearCookie('connect.sid');
    res.redirect('/')
})
```

`res.clearCookie` only clears the cookie if the given options is identical to those given in `res.cookie()`. See: https://stackoverflow.com/questions/33112299/how-to-delete-cookie-on-logout-in-express-passport-js

# Implementing refresh tokens, refreshing access tokens

In [OAuth](./OAuth.md), the OAuth client uses an access token to make requests to the resource server.
Access tokens expire after a certain timing. There are two ways to handle expirations:
1. Let users log in again
2. Use the refresh token to get a new access token without the user's interaction.

Use a Redis key value store to store the user's email address -> refresh token mapping. Alternatively, a database can be used.

Flow using backend:
1. user authorises app
2. oauth2 api returns an access token and a refresh token
3. user's access token expires
4. oauth2 client automatically obtains a new access token
5. TODO: how to send the new access token to the user?
- brute force: after refreshing the token, send it back to the user with a set-cookie thing.
- there is a 'tokens' event that we can use. the refresh token can be stored in the database.
- if user's api request fails, refresh the token. then send it back to the user in a set-cookie thing.

Requirements:
1. If a user's access token expires, when I make an API call, it should not return "not used", but it should complete the API request and return the new access token.
2. If a user's refresh token expires, get a new token 
3. If a user logs out, revoke refresh tokens from database.

Issue: how to refresh the access token?

1. If a user's access token expires, when I make an API call, it should not return "not used", but it should complete the API request and return the new access token.

2. if the frontend receives 401, the frontend attempts to refresh the access token. This is handled automatically by axios interceptors.
cons: 2 API requests everytime the frontend is not authenticated.

3. Refactor the backend to only associate a cookie with a session ID. Access tokens and refresh tokens are stored in the backend. In that way the backend always stores the most updated access tokens without the frontend knowing. 
- store access tokens in the backend when user first logs in
- when user makes API request, retrieve access token from database
- when user's access token expires, store the new access token in the database (using the 'tokens' event)
- when user's refresh token expires, store the new refresh token in the database (using the 'tokens' event)
    - might need to retreive another access code after this


Selecting: 3
- Adds persistence to access token and refresh token.
- avoids too many API calls to the frontend
- straightforward

Issue: how to handle multiple tabs?
- Eg there are two tabs that are logged in. Each page has a cookie.
- One tab logs out. On the backend the user is logged out. On the frontend it's not logged out.
- Solution (which can also solve the log out issue on Safari?): when a request is made, check if the user is logged out. If it is, redirect users to an unauthorised page with 401.

Breakdown into tasks:
1. Add a database of choice to store session ID, access token, username, refresh token
- Add MongoDB Docker image, with a volume mount. 
- Might need to use Docker Compose
- Add schema
2. Store access tokens in backend when user first logs in. Update access token if the user logs in, otherwise create an entry.
- Add schema: primary key: email. Content: access token, refresh token
- Add in memory database testing
3. When user's access token expires, store new access token
4. When user's refresh token expires, store new refresh token
5. When user logs out, remove the entry. 


## Trivia

https://stackoverflow.com/questions/14923799/login-with-google-always-asks-user-consent
- Google always asks for user consent on localhost sites