import React from "react"

export default function Navbar(props){
    const weight = {"A* Search": "weighted", "Djikstra":"weighted", "Greedy Best-First Search":"weighted", "Depth-First Search": "unweighted", "Breadth-First Search": "unweighted"}
    
    const guarantee = {"A* Search": "guarantees", "Djikstra":"guarantees", "Greedy Best-First Search":"does not guarantee", "Depth-First Search": "does not guarantee", "Breadth-First Search": "guarantees"}
    
    function handleChange(event){
        props.setCurrentAlgo(event.target.value)
    }

    
    return (
        <nav className = "nav--container">
            <form>
                <label htmlFor="algo" className="form--label">Choose Algorithm: </label>
                <select 
                    id="algo"
                    value={props.currentAlgo}
                    onChange={handleChange}
                    name="algo"
                    className="form--input"
                >
                    <option value="A* Search">A* Search</option>
                    <option value="Djikstra">Djikstra</option>
                    <option value="Greedy Best-First Search">Greedy Best-First Search</option>
                    <option value="Breadth-First Search">Breadth-First Search</option>
                    <option value="Depth-First Search">Depth-First Search</option>
                    
                </select>
                <div className="nav--textcontainer">
                    <p className="nav--algotext">{props.currentAlgo} runs on <b>{weight[props.currentAlgo]}</b> graphs and <b>
                    {guarantee[props.currentAlgo]}</b> finding the shortest path</p>
                </div>
            </form>
            <div className = "nav--legend">
                <span>Legend: </span>
                <div className="legend--element">
                    <label htmlFor="start" className="form--label">Start Node</label>
                    <div className = "legend--start" id="start">
                    </div>
                </div>
                <div className="legend--element">
                    <label htmlFor="target" className="form--label">Target Node </label>
                    <div className = "legend--target" id="target">
                    </div>
                </div>
                <div className="legend--element">
                    <label htmlFor="path" className="form--label">Path Node </label>
                    <div className = "legend--path" id="path">
                    </div>
                </div>
                <div className="legend--element">
                    <label htmlFor="visited" className="form--label">Visited Node </label>
                    <div className = "legend--visited" id="visited">
                    </div>
                </div>
                <div className="legend--element">
                    <label htmlFor="wall" className="form--label">Wall Node </label>
                    <div className = "legend--wall" id="wall">
                    </div>
                </div>
                <div className="legend--element">
                    <label htmlFor="weight" className="form--label">Weight Node </label>
                    <div className = "legend--weight" id="weight">
                    </div>
                </div>
            </div>
        </nav>
    )
}