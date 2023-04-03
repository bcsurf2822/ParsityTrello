# Trello 2.0
This project was made by Ben Corbett, Nicholas Lopez, and Joseph Liow, students at Parsity.

Using React, Redux, Node, Mongoose, MongoDB, and TailwindCSS we created Trello 2.0 as a team to practice Agile Development.  With Parsity's Tech Lead, Peter Elbaum acting as the client, we assigned eachother roles as Product Manager, Backend Lead, Frontend Lead, and Design.  We held these roles for the duration of the project. Every morning we did a standUp meeting and set tasks for each member of the team.  Throughout the day we communicated through slack and practiced GitHub collaboration.  We also used the Trello website as inspiration and also used it to keep track of our team workflow keeping track of tasks that are finished, in progress, need-to-do, and "Roadblocks" that we encountered.

The Trello 2.0 project features a Login Page using a Local JWT Strategy, using usernames and passwords we generated for our DataBase.  Using faker we generated fake boards, cards, and lists to use on the frontend.  The Model Structure that we used on the backend are that the cards are nested in the lists and the lists are nested in the boards.  The cards also have a nested comments and label feature so that the logged in user can comment and assign lables to said tasks.  Feature implemented in each feature are GET to retrieve fake data originally and then anything that is added after Posting , DELETE to remove any feature, POST to add feature, and PATCH to update features.

React was used to design and implement features on our componenets while Tailwind was used for our CSS. Using Redux we created a store to manage our state and Mongo and Mongoose as our Database.

TBC...
