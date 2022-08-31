import React from "react"

export default function Node(props){
    let color
    if (props.isStart){
        color = "green"
    }
    else if (props.isEnd){
        color = "red"
    }
    else if (props.isPath){
        color = "yellow"
    }
    else if (props.isVisited){
        color = "blue"
    }
    else if (props.isWeight){
        color = "purple"
    }
    else if (props.isWall){
        color = "black"
    }
    else{
        color = "white"
    }
    //onMouseLeave={props.eraseOldStartEnd}
    const styles = {backgroundColor: color}
    return (
        <div className = "node--container" style={styles} onMouseDown={props.setMode} onMouseUp=    {props.resetMode} onMouseEnter={props.setStartEndWalls}>
        </div>
    )
}