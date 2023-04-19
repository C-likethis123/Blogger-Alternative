## Functional requirements

Logging in
1. Users should be able to login to the app
2. When logged in, users should be able to access different blogs
3. They should be able to create, edit, view and delete blogs

Authentication
1. If a user is not logged in, the user cannot see other protected pages (creating and editing blogs). When they access the page, they would be routed to the sign in page.
2. If a user is logged in, the user can see protected pages

Posts
1. In each blog, a user should be able to create a post
2. Users should be able to view posts
3. Users should be able to edit posts
4. Users should be able to delete posts
5. When editing posts, the data should be saved in frequent intervals


## Non functional requirements
1. Data should be synced between the backend and Google OAuth
2. Security: client secret should not be visible in the frontend
3. Optimisation: keep within 3000 API requests per day

# Solutions

Naive solution:
- Implement 2 legged oauth. User sends username and password, and gets an authorisation token.
- User uses auth token to authenticate all requests, do CRUD operations
- Data is stored in Google OAuth’s servers. 

Cons to naive solution:
- security: client secret is sent to all users
- Rate limiting: will bust through rate limit (bottleneck being auto save feature)

Solution 2: solve security
- Implement 3 legged oauth.
- Login
    - Frontend will receive authorisation code
    - Frontend sends auth code to backend, backend will receive a token
    - Option 1
        - Backend sends token to frontend, but retains the refresh token -> can be stored in a httponly cookie (cons: not very secure as the token is accessed to the frontend)
    - Option 2
        - Backend stores both access token and refresh token, but client is identified using the session ID or profile (cons: have to implement identification via session ID, but more secure)

Solution 3: 3 legged oauth + session
- Login
    - Backend stores both access token and refresh token after authentication flow
    - If frontend is not signed in, by the end of the login, the frontend should receive a session ID that they can store in a http cookie.
- Authorisation
    - When frontend makes a request to the backend, they must attach the session ID in their cookie
    - Routes have to be verified - either on the frontend or the backend
    - Once accessing the route, the API call also has to attach the token, and the token must be verified. (2 API calls made by the frontend)
    - If access token expired, ask for a new one. Set session expiry time the same as the token’s expiry date.
    - When user logs out, delete the session on the frontend (remove the cookie) and expire the session ID.
- CRUD
    - Frontend makes request to backend -> must attach session ID in their cookie
    - Frontend makes requests to backend. Backend makes api calls to Google Oauth using the token stored and receives response, and sends it to frontend

How to implement…
Creating a blog

Retrieving a blog: GET v3/blogs/{blog ID}
Important data: name, description, posts, pages

Retrieving all blogs from a user: get v3/users/{userId}/blogs

Creating a post
POST /v3/blogs{blog ID}/posts/, include blog ID, title and content

Deleting a post

Updating a post

Automatically saving a post
- Save every 3 seconds (?)
- Should implement debouncing

Use `fields` to specify partial response


What’s my rate limits: 
- max 50 posts created per day
- How many times can I call the UPDATE api?
