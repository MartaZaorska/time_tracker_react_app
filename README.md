# Time Tracker Application

> Simple MERN with GraphQL application - create timers, analyze your activity during the day and view statistics on charts from the last 3 days or last week.

## Table of contents

- [General info](#general-info)
- [Demo](#demo)
- [Technologies](#technologies)
- [Setup](#setup)
- [Contact](#contact)

## General info

In the application, the user must first log in / register (to see the application you can log in to the test account - e-mail: test@test.com, password: test).

You can create, view and delete timers. For a new timer the user selects a category. The user can also add a description.
There are two options for ending the timer: immediately or select the date and time (for example, if the user has forgotten to do it at the right time). The timer list can be filtered by date and category. Users can analyze their activity on charts that represent the percentage of categories for the selected day, the last 3 days, the last week or the last two weeks.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Photos from the collection created by Joan Aldrich on Unsplash (collection id: 962362)

## Demo

See online my project: http://time-tracker-app-martazaorska.herokuapp.com/

## Technologies

- express - version ^4.17.1
- mongoose - version ^5.8.11
- graphql - version ^14.6.0
- express-graphql - version ^0.9.0
- bcryptjs - version ^2.4.3
- jsonwebtoken - version ^8.5.1
- cors - version ^2.8.5
- config - version ^3.2.5
- concurrently - version ^5.1.0

- react - version ^16.12.0
- chart.js - version ^2.9.3
- react-chartjs-2 - version ^2.9.0
- node-sass - version ^4.13.1

## Setup

Clone this repo to your desktop, next go to root directory and run npm install, next go to client directory and run npm install to install all dependencies.
When the dependencies are installed, go to the ./config/default.json file in the root directory and type your database uri. In the root directory run "npm run dev" to start the application.

## Contact

Created by [Marta Zaorska](https://martazaorska.github.io/portfolio/).
