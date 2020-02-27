# Bookmarks App
A bookmark app designed as my second project for Thinkful's Software Engineer Immersion program. 

## Live Demo

A live demo has been deployed on Github Pages at
(https://thinkful-ei-macaw.github.io/andrewdurrant-bookmarks-app/)

## Motivation

This was a great opportunity for me to begin working with state and REACT-ful architecture in preparation to learn REACT in the coming weeks. 


>### **Technical Requirements**
Use fetch for AJAX calls and jQuery for DOM manipulation

Use namespacing to adhere to good architecture practices

Minimal global variables
Create modules in separate files to organize your code
Logically group your functions (e.g. API methods, store methods...)
Keep your Data out of the DOM

No direct DOM manipulation in your event handlers!
Follow the React-ful design pattern - change your state, re-render your component
Use semantic HTML

Use a responsive and mobile-first design

Visually and functionally solid in viewports for mobile and desktop
Follow a11y best practices

Refer back to the lessons on accessibility, forms

> ### **User Stories**

As a user:

I can add bookmarks to my bookmark list. Bookmarks contain:

title
url link
description
rating (1-5)
I can see a list of my bookmarks when I first open the app

All bookmarks in the list default to a "condensed" view showing only title and rating
I can click on a bookmark to display the "detailed" view

Detailed view expands to additionally display description and a "Visit Site" link
I can remove bookmarks from my bookmark list

I receive appropriate feedback when I cannot submit a bookmark

Check all validations in the API documentation (e.g. title and url field required)
I can select from a dropdown (a <select> element) a "minimum rating" to filter the list by all bookmarks rated at or above the chosen selection

(Extension feature - optional) I can edit the rating and description of a bookmark in my list

## Technologies

* HTML5
* CSS3
* Javascript
* jQuery
* Thinkful JSON API Engineering Immersion

## Features

* Ability to add bookmarks.
* Filter Bookmarks based on rating.
* Ability to delete bookmarks.


## Challenges

* Getting the call to the API working correctly.
* Working out the architecture. Setting up and correctly using the Generate -> Handle Events -> Render.
* Getting all of my different html sections to render correctly and in order. 
* Using the store to render my various pages of the app.

> ### **Challenges: the funnies section**


> ## Future Additions
* Ability to edit the bookmarks.

