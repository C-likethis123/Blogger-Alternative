# Blogger Alternative

![UI Screenshot of Blogger Alternative](ui.png)

This project is started to develop a web application with a better blog editing experience than the current Google Blogger web application. It will involve more keyboard shortcuts and integrate Markdown support.

## Current features

- An editor that has a WYSIWYG (What you see is what you get) mode and a Markdown editor mode
- Markdown support
- Ability to add screenshots to blog posts
- Autosave blog posts
- Download blog posts as Word documents

## Technology Stack

* MERN: MongoDB, Express, React, Node.js
* Frontend libraries: ReactStrap, styled-components
* External libraries: Toast UI Text Editor as the text editor of choice
* Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Contributing

### Prerequisites

1. Yarn, as the package manager of choice
2. MongoDB

### Setting up

1. Run `git clone https://github.com/C-likethis123/Blogger-Alternative.git` to get a working copy in your computer
2. Run `yarn` to install all dependencies
3. Run `yarn start` to start the development server
4. Run `mongod` to start the mongod driver. If the database files are in another directory, specify it with the `dbpath` option. For example: `mongod --dbpath=[directory]`
5. Run `yarn server` to start the database (will phase out as soon as I integrate the Google Blogger API)

### PR process

1. Branch from this repository
2. Make a PR

## Reflections

I learnt about:

- Implementing autosave features
- Implementing features to download data
- Databases: MongoDB and Mongoose
- Express: I learnt how to use the Express Router and how to create and use REST APIs
- Contributing to the Toast UI Text Editor repository
- Git: rebasing, amending commits, reflogging
- Creating a custom fork and pointing this project to the custom fork

Besides learning the technical aspects of web development, I decided to change my development process a little. In the past, I did not have a proper code review process. For this project, I made sure to implement features in different branches and issue PRs when I wanted to merge the code to master. In this way, I review the code I write so I can catch any bugs if necessary.

Ideally, there are some other things I want to learn:

- Deploying to AWS Amplify
- Integrating this application with Google OAuth
- Using the Google Blogger API
- A frontend testing framework
- Making this a progressive web application
