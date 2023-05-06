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