# Overview

There are two choices: to make this server side or client side rendered?

## The case for server side rendering

- SEO: the landing page should be server side rendered to improve SEO

- Post List page: using client side rendering, it would take:
    - 1 api request to render the form
    - 1 api request to retrieve a list of blog posts
If it's server side rendered, it would take just 1 api request to render the form that comes with its data.