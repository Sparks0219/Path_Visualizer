# Pathfinding Visualizer

This is my Pathfinding Visualizer inspired from Clément Mihailescu's video on his projects. 
I used a combination of JavaScript, CSS, HTML, and React hooks to construct 
a 2d grid allowing users to visualize common pathfinding algorithms. 

## Features

Some features included in the Pathfinding Visualizer are:

- Users can move/drag the start and target nodes
- Users can draw walls and weighted nodes 
- Users can run common pathfinding algorithms such as Djikstra, A* star, and BFS
- Users can clear certain parts of the grid (walls, weights) or the entire grid. 

## Purpose and What I Learned

The main reason for doing this project is to test my skills on a project of my own design
after completing Scrimba's Intro to React course. I always wanted to give this project a shot
once I saw Clément Mihailescu's video describing it, and this was my take on it. From 
creating a 2d grid, implementing walls and weights, and ultimately being able to run
pathfinding algorithms on the grid, it was a lot of fun to do and I hope that if you 
have time to also give it a shot yourself! 

Some of the core React concepts I used in this project were:

- the useState() hook to store and update variables regarding nodes such as whether they were weighted, walls, etc. 
- the useEffect() hook to allow/disallow weighted nodes depending on what algorithm is picked
- the useTimeout() hook to create the animation for the pathfinding algorrithms 
- Conditional Rendering to show/hide the tutorial page and enabling dynamic styles for the node colors 

## Try it here!
https://sparks0219-path-visualizer.netlify.app
