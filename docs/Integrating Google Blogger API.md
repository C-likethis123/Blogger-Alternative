# Overview

The backend APIs are an abstraction of the user invoking the Google Blogger API.

## Authorisation

We now have the access token and refresh token.
How do we use that to make Google Blogger API requests?

A simplistic approach is to retrieve the API token from the cookie that the user sends.
From the cookie, retrieve the access token from the session store.
Then attach that access token into the `Authorization` header when we make a Google Blogger API request.

## Refreshing tokens
How do we refresh tokens? When do we refresh tokens?

When the user is authenticated, it passes the access token and refresh token to the client.
We can set it using `oauth2Client.setCredentials(tokens)`.

The GoogleAPI module has a OAuth2 client that handles retrieval of access tokens, refreshing, and retrying the request. We can use the OAuth2Client to manage access tokens.

For example:
```
oauth2Client.on('tokens', (tokens) => {
    if tokens.refresh_token
        console.log(tokens.refresh_token)
    console.log(tokens.access_token)
})
```

This tokens event only occurs in the first authorisation. Once the client has a refresh token, access tokens will be acquired and refreshed automatically in the next call to the API.

[Refresh tokens best practices](https://stateful.com/blog/oauth-refresh-token-best-practices)

Implementation at the API level
- create an OAuth2Client
- anytime the user makes a request, it will send its user id.
- find access token and refresh token from the database
- set OAuth2Client with the database
- create an event listener to listen for the 'tokens' event and store refresh token in the user's database

## Library of choice
We can use axios to make requests and parse responses ourselves.

Alternatively, we can use the `google-api-nodejs-client` client library for using Google APIs.
We can create a Blogger Client and retrieve details of a blog given the blog ID:
```javascript
const {google} = require('googleapis');

// Each API may support multiple versions. With this sample, we're getting
// v3 of the blogger API, and using an API key to authenticate.
const blogger = google.blogger({
  version: 'v3',
  auth: 'YOUR API KEY'
});

const params = {
  blogId: '3213900'
};

// get the blog details
blogger.blogs.get(params, (err, res) => {
  if (err) {
    console.error(err);
    throw err;
  }
  console.log(`The blog url is ${res.data.url}`);
});
```


Alternatively, I can make calls directly to the APIs by installing a submodule:
```javascript
const docs = require('@googleapis/docs')

const auth = new docs.auth.GoogleAuth({
  keyFilename: 'PATH_TO_SERVICE_ACCOUNT_KEY.json',
    // Scopes can be specified either as an array or as a single, space-delimited string.
  scopes: ['https://www.googleapis.com/auth/documents']
});
const authClient = await auth.getClient();

const client = await docs.docs({
    version: 'v1',
    auth: authClient
});

const createResponse = await client.documents.create({
    requestBody: {
      title: 'Your new document!',
    },
});

console.log(createResponse.data);
```

## Version

There are two versions - Google Blogger API v2 and v3. I'm using Google Blogger API v3.

## Errors

### Authentication errors 
I saw the "UserInfo" error which indicated the credentials did not have the correct permissions to use the Google Blogger API
Possible reasons why:
- not enabling required scopes - blogger scope has to be accompanied with the profile
- setting the app to a "in production" instead of "testing"

### API errors

`Blogs#listByUser`: I got a 404 error when using the ID accompanied from the Google Account.
- Note that the blogger ID is different from the user ID.
- important fields for this API: blog.items
- important field for a blog: blog.id, blog.name, pages


### APIs exposed to frontend

This is detailed in [API Spec](./API%20spec.md)

## Resources

[Google Blogger API Reference](https://developers.google.com/blogger/docs/3.0/reference/)
[Sample Google Blogger API usage](https://github.com/googleapis/google-api-nodejs-client/blob/main/samples/blogger/insert.js)
[Blogs resource API](https://developers.google.com/blogger/docs/3.0/reference/blogs#resource)
[Google Blogger API client library reference](https://developers.google.com/blogger/docs/3.0/reference/)