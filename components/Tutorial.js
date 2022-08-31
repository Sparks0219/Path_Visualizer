import React from "react"

export default function Tutorial(props){
    return(
        <div className = "tutorial--container">
            <h3 className="tutorial--title">Instructions</h3>
            <ul>
                <li>Click on a wall or weight node to enter "eraser mode" and then drag over wall and weight nodes to remove them</li>
                <li>Click on a blank node to either enter "wall mode" or "weight node", drag over blank nodes to occupy them</li>
                <li>Switch between selecting "wall mode" and "weight mode" by clicking the right most button to toggle between them </li>
                <li>Weight nodes have a weight of 5 while blank nodes have a weight of 1</li>
                <li>You can move both the start and end nodes by dragging them</li>
                <li>To start the pathfinding animation, select an algorithm from the top left
                drop down box and click the bottom left button</li>
            </ul>
            <p>Thanks for visiting and hope you have fun with the pathfinder!</p>
            <button onClick={props.switchOff}>Hide</button>
        </div>
    )
}