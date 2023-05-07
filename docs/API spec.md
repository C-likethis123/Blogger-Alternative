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

`GET /api/blogs/{blogId}`

A successful response returns a list of posts that belongs the blog of specified `blogId`, in this format:

```
[{
    blogId: blogId,
    title: [post title],
    status: [whether the post is published]
}]
```

TODO: improve this section

### Field filtering

To limit the response, we can use `fields="[list of fields]"` parameter to indicate what subfields to return.
[This link](https://developers.google.com/slides/api/guides/field-masks) provides some examples of how to specify the shape of the response given.

Limitations as compared to GraphQL: GraphQL can specify the shape of the query across what would likely take multiple API calls, across different services (with a federated subgraph)