# BRAINWASH

## Introduction
---
Over the last few years, while working through the pandemic, we’ve been spending a lot more time at home and people have turned to social media to stay connected with others to fill that extra time.

As we know, many of the popular social media platforms, like Instagram and TikTok, have been proven to be quite detrimental to our mental health, so we wanted to create a platform which would foster a healthier online community where people can connect with one another in a social context, all while consuming more positive content.

Users come to Brainwash to learn new skills, improve existing passions, and share their own knowledge through various media types with an online community of other passionate lifelong learners - think of Brainwash as Master Class meets Instagram & Youtube.

Brainwash is our submission for the final project for the Lighthouse Labs Web Development Bootcamp. Over an enjoyable 10 days, the creators: Russell Engebretson, Sophie Oliver and Katie Herda, worked together to build out an MVP of the platform, expanding on knowledge learned in the bootcamp, to add functionality that would allow users to create and consume content, and communicate with other Brainwashers.

## Live Server
We have launched our app live using Heroku, it can be accessed at [https://brainwash-ify-ology.herokuapp.com/](https://brainwash-ify-ology.herokuapp.com/)

## Features
---
### User Authentication
- Signup & Login supported by Auth0 - users can access their account using either their Google or Github account
- User authentication will pull data from the chosen social account, including email, name, and the user's social avatar -- user details are made customizable after signup (see profile page section)
- Once a user is authenticated, they have access to the full suite of Brainwash features (non-authenticated users have limited functionality, ex. no liking or commenting on posts)
- Users can log out simply by clicking the Logout button in the navigation bar

### Post Index (aka Home Page)
When you arrive at Brainwash, you will be on the main index page, also known as the Home Page. 

![Post Index/Home Page](https://github.com/sjoliver/brainwash-ify-ology/blob/main/public/images/Screen%20Shot%202021-12-15%20at%201.55.11%20PM.png?raw=true)

Here, you can:
- View a list of the most recent posts by other users
- Save posts to your "Liked Posts" page so you can come back to them later
- Toggle to your liked posts by selecting the "Liked Posts" tab at the top of the index
- Search posts by title
- Filter posts by interest categories (all posts are required to have an interest tag)
- Click on the "New Post" button to create your own post (only available to authenticated users)
- Click on a post to navigate to the post details page where you can view the post's video or audio file, read the post's description, and like & comment on the post

### Post Details
When you click on a post, it will take you to the Post Details (show) page.
![Post Details](https://github.com/sjoliver/brainwash-ify-ology/blob/main/public/images/Screen%20Shot%202021-12-15%20at%201.55.52%20PM.png?raw=true)

Here, you can:

- Watch the Audio or Video file
- Read the description
- Like/unlike the post
- Leave a comment on the post
- Delete your comments on the post
- View other comments on the post
- Navigate to the profile page of the content creator or any of the commentors

### Profile Page
There are two profile pages on our site, your profile and other users' profiles. To access your profile, click on your avatar/username in the nav bar. 
![Profile Page](https://github.com/sjoliver/brainwash-ify-ology/blob/main/public/images/Screen%20Shot%202021-12-15%20at%201.56.29%20PM.png?raw=true)

On your profile, you can:
- View your follower/following counts
- View and edit your profile info (username, bio, avatar)
- Search through your posts by title
- Filter your posts by interests
- Create a new post

You can also view other users' profile pages by clicking on their usernames on either their posts, or in their comments. 

Here, you can:
- View their profile info (username, bio, avatar)
- View all an index of posts they've created
- Follow/unfollow the user
- View any of their posts that you've liked (same toggle as Home Page)
- Search by title
- Filter by interests
- Create a new post

### Create New Post

Creating a new post includes: 
- Adding a title & description
- Selecting a post type (audio or video) and a post interest category (ex. Home Improvements)
- Upload a thumbnail image (image that is shown on the post index card)
- Upload a post file (audio or video file formats supported)
- Creating a new post will save all associated files to the cloud (Cloudinary)


## Repository
---
This is the front end repository for our app, if you would like to view the backend API click [Brainwash-API](https://github.com/sjoliver/brainwash-ify-ology-api)

We built the frontend with React, utilizing React Router to mimic a multi-page application.

With the short 10 day timeline for producing the platform, we wanted to go with a simple and clean UI. We accomplished this in part by implementing Material UI components. 

For user authentication, we integrated Auth0 using oAuth 2.0 which enabled users to access their accounts with their social logins. Auth0 implementation enabled us to build a login/logout feature without having to deal with security issues associated with handling user data properly. It also removes the need for users to remember yet another username and password combo. 

We are very proud of the work that went into this application with the limited time we were given, but some of the key improvements we would like to complete are as follows:

- Re-organize state to allow the app to run more efficiently (ex. limit the number of backend axios API calls, boosting efficiency and overall user experience)
- Incorporating context and/or redux to manage state more effectively
- Update some UI elements -> ex. introducing a separate "save" feature instead of utilizing the likes feature (you should be able to like a post but not be interested in learning it) 
- Implement an in-app chat/inbox feature so user's can connect privately 
- Implement post annotations so user's can create & share their notes 

## Project Layout
---
This application was laid out following some best practices while using React. In the src directory you will find a [component directory](https://github.com/sjoliver/brainwash-ify-ology/tree/main/src/components) which houses all of our react components which are fed to the App.js file located in the root of the src directory.

# Running the Repo locally for development
---
create a .env file with a single component in it
```js
  PORT=3002
```

This is to avoid conflicts with the rails backend API running on port 3000, React's default.

run the following commands in your terminal: 
```js
npm install
npm start
```
The server should start on localhost port 3002.
