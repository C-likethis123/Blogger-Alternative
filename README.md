# Blogger Alternative

This project is started to develop a web application with a better blog editing experience than the current Google Blogger web application. It will involve more keyboard shortcuts, and possibly integrate Markdown support. 

# Current features:
- An editor that has a WYSIWYG (What you see is what you get) mode and a Markdown editor mode
- Markdown support 
- Ability to add screenshots to blog posts
- Autosave blog posts
- Download blog posts as Word documents

# Technology Stack: 
* MERN: MongoDB, Express, React, Node.js
* Frontend libraries: ReactStrap, Toast UI Text Editor
* Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Setting up
1. Run `git clone https://github.com/C-likethis123/Blogger-Alternative.git` to get a working copy in your computer
2. Run `npm install` to install all dependencies
3. Run `npm run start` to start the development server
4. Run `npm run server` to start the database (will phase out as soon as I integrate the Google Blogger API)

# Reflections
I learnt about:
- Implementing autosave features
- Implementing features to download data 
- Databases: MongoDB and Mongoose
- Express: I learnt how to use the Express Router and how to create and use REST APIs
- Contributing to the Toast UI Text Editor repository
- Git: rebasing, amending commits, reflogging

Besides learning the technical aspects of web development, I decided to change my development process a little. In the past,
I did not have a proper code review process. For this project, I made sure to implement features in different branches and issue PRs when I wanted to merge the code to master. In this way, I review the code I write so I can catch any bugs if necessary.

Ideally, there are some other things I want to learn:
- Deploying to AWS Amplify
- Integrating this application with Google OAuth
- Using the Google Blogger API
- A frontend testing framework
- Using Electron (I plan to make a desktop app for this)