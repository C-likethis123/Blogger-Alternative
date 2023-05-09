# Overview

This document outlines the APIs that the server exposes to the Blogger Alternative client.
The APIs are based on what the client would need for functionality.

### Retrieve a list of blogs
`GET /api/blogs`

A successful response returns the following
```
[{
    id: [blog ID],
    name: [blog name],
    pages: [number of pages this blog has?]
}]
```

Google Blogger API: [listByUser](https://developers.google.com/blogger/docs/3.0/reference/blogs/listByUser)
Relevant fields:
{
    items:[{
        id,
        name,
        status
    }]
}

`GET /api/blogs/{blogId}`

A successful response returns a list of posts that belongs the blog of specified `blogId`, in this format:

```
[{
    blogId: blogId,
    title: [post title],
    status: [whether the post is published]
}]
```

Google Blogger API: [Posts.list](https://developers.google.com/blogger/docs/3.0/reference/posts/list)

Relevant options:
{
    fetchBodies: true/false,
    maxResults: int,
    pageToken
}

Relevant fields in response:
{
    nextPageToken,
    items: [{
        id,
        status,
        title,
        content,
    }]
}

`GET /api/blogs/{blogId}/posts/{postId}`

A successful response returns post data for the specified post:

```
{
    id,
    title,
    content,
    images: [{url:}]
}
```

Relevant API: [Posts.get](https://developers.google.com/blogger/docs/3.0/reference/posts/get)



`POST blogs/blogId/posts`

A successful response adds a post to the Google Blogger API server and returns the following:

```
{
    id,
    title,
    content,
    images: [{url:}]
}
```

Relevant API: [Posts.insert](https://developers.google.com/blogger/docs/3.0/reference/posts#resource)

`PUT blogs/blogId/posts/postId`

Used for saving drafts and posts.

It should return the following:
```
{
    id,
    title,
    content,
    images: [{url:}]
}
```

`POST blogs/blogId/posts/postId/publish`

Used for publishing.

The method does not return anything.

TODO: to merge this with the previous PUT blog/blogId/posts/postId API, or to keep them as separate APIs?
Relevant blogger API: [Post.publish](https://developers.google.com/blogger/docs/3.0/reference/posts/publish)

`DELETE blogs/blogId/posts/postId`

Deletes the specified post.
Returns an empty response body.

Relevant blogger API: [Post.delete](https://developers.google.com/blogger/docs/3.0/reference/posts/delete)

### Field filtering

To limit the response, we can use `fields="[list of fields]"` parameter to indicate what subfields to return.
[This link](https://developers.google.com/slides/api/guides/field-masks) provides some examples of how to specify the shape of the response given.

Limitations as compared to GraphQL: GraphQL can specify the shape of the query across what would likely take multiple API calls, across different services (with a federated subgraph)

## Resources
[System Parameters](https://cloud.google.com/apis/docs/system-parameters)