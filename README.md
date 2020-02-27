# Bookmarks App
A bookmark app designed as my second project for Thinkful's Software Engineer Immersion program. 

## Live Demo

A live demo has been deployed on Github Pages at
(https://brunchbirds.netlify.com/)

## Motivation

I am passionate about healthy eating and wanted to create a well-thought out restaurant website that was easy to navigate. 

>### **Technical Goals**
> 1. Establish a workflow for my project and spend time learning about the different steps in the design and build  process.
> 2. I wanted to utilize Sass, BEM methodology and an MVC architecture model for my code.
> 3. Create a custom Webpack configuration to bundle my files.
> ### **Design Goals**
> 1. Create a responsive website that looks clean on both mobile and desktop.
> 2. Organize content so that users are able to quickly find the information they are looking for, particularly the food menu.
>

## Technologies

* HTML
* Sass
* Javascript
* Leaflet library
* Mapbox API
* Webpack

## Features

* A fixed navigation allows users to easily find what they are looking for within the website
* Map shows users the location of Brunch Bird's restaurant.
* Carousel slider rotates through customer reviews
* Food menu has drop-down sections allowing users to easily navigate to find what they are looking for


## Challenges

* I had used Webpack within a tutorial project and saw how useful it could be to automate tasks and do things like bundling, compiling and minimizing. This ended up being more complex than I had anticipated, but it did help me become more proficient in reading documentation.
* Allowing the user to click on the dots to change the current slide in the carousel would cause the rotation through slides to fritz out. I had to separate the timer function from the rendering function, making sure to clear it and reset it when a new slide was being rendered.
* Learning how to hide an API key was a little bit of a challenge. I did not want to upload my API key to Github, so I had to do some research into process.env files.
* I had issues with the navigation menu closing properly. I had set the animation-fill-mode to "forwards", which caused the navigation items to jump offscreen before jumping back to animate themselves offscreen. I found that using "both" allowed the items to maintain their position on both sides of the animation.
> ### **Challenges: the funnies section**
> * While working on the nav bar, I accidentally covered the entire screen in a transparent fixed div container so nothing was able to be clicked on the site. It wasn't until I was watching things in the developer console until I figured out what was going on.
>
> * I decided to change a variable name late in the game, not realizing that I hadn't changed it as well in a sass file. I spent way too long on this. I have since found out that VS Code has a rename symbol command.

## Future Additions

* A vendor/purveyor list of local farms, ranches and ingredient resources
* Expanding to multiple locations which would allow for more functionality with the Leaflet map
* Creating a blog for greenhouse/garden updates
* Food ordering: creating components that would allow customers to find a table or order for pickup and/or delivery
* Creating a shop with Brunch Birds merchandise such as mugs, t-shirts, sweatshirts, aprons, reusable totes, homemade artisanal goods, gift cards, etc.