import React, {useState,useEffect} from "react"
import Node from "./Node"

export default function Grid(props){
    const ROWS = 25
    const COLS = 40
    const [start,setStart]= useState({row:13, col:9})
    const [end,setEnd] = useState({row:13, col:31})
    const [grid, setGrid] = useState(generateNewGrid())
    const [startMode, setStartMode] = useState(false)
    const [endMode, setEndMode] = useState(false)
    const [wallMode, setWallMode] = useState(false)
    const [weightMode, setWeightMode] = useState(false)
    const [clearWallAndWeightMode, setClearWallAndWeightMode] = useState(false)
    const [usingWalls, setUsingWalls] = useState(true)
    const [inProgress, setInProgress] = useState(false) 
    const [weightedAlgo, setWeightedAlgo] = useState(false)
    
    useEffect(() => {
        if (props.algoId === "Djikstra" || props.algoId === "Greedy Best-First Search" 
            || props.algoId === "A* Search"){
            setWeightedAlgo(true)
        }
        else{
            setWeightedAlgo(false)
            setUsingWalls(true)
            clearWeights()
        }
    }
    ,[props.algoId])
    
    function clearGrid(){
        if (inProgress === false){
            setGrid(generateNewGrid())
        }
    }
    
    function clearWalls(){
        setGrid(prevGrid => prevGrid.map(oldRow => {
            return oldRow.map(oldNode => {
                const newNode = {...oldNode}
                newNode.isWall = false
                return newNode 
            })
        }))
    }
    
    function clearWeights(){
        setGrid(prevGrid => prevGrid.map(oldRow => {
            return oldRow.map(oldNode => {
                const newNode = {...oldNode}
                newNode.isWeight = false
                return newNode 
            })
        }))
    }
    
    function clearPath(){
        setGrid(prevGrid => prevGrid.map(oldRow => {
            return oldRow.map(oldNode => {
                const newNode = {...oldNode}
                newNode.isPath = false
                newNode.isVisited = false
                return newNode 
            })
        }))
    }
    
    function setWallsOrWeights(){
        setUsingWalls(prev => !prev)
    }
    
    function setMode(grid,id){
        if (inProgress){
            return; 
        }
        const newGrid = grid.map(oldRow => {
            return oldRow.map(oldNode => {
                const newNode = {...oldNode}
                if (newNode.id === id){
                    if (newNode.isStart){
                        setStartMode(true)
                    }
                    else if (newNode.isEnd){
                        setEndMode(true)
                    }
                    else if (newNode.isWall || newNode.isWeight){
                        setClearWallAndWeightMode(true);
                        newNode.isWall = false; 
                        newNode.isWeight = false; 
                    }
                    else{
                        if (usingWalls){
                            setWallMode(true)
                            newNode.isWall = true; 
                            newNode.isWeight = false; 
                        }
                        else{
                            setWeightMode(true)
                            newNode.isWall = false; 
                            newNode.isWeight = true; 
                        }
                    }
                }
                return newNode 
            })
        })
        setGrid(newGrid)
    }

    function resetMode(grid,id){
        setStartMode(false)
        setEndMode(false)
        setWallMode(false)
        setWeightMode(false)
        setClearWallAndWeightMode(false)
    }
    
    function setStartEndWalls(grid,id){
        if (!startMode && !endMode && !wallMode && !clearWallAndWeightMode && !weightMode){
            return; 
        }
        const target = findElement(grid,id);
        if (startMode && target.isEnd || endMode && target.isStart){
            return;
        }
        const newGrid = grid.map(oldRow => {
            return oldRow.map(oldNode => {
                const newNode = {...oldNode}
                if (newNode.id !== id){
                    if (startMode && newNode.isStart){
                        newNode.isStart = false;
                    }
                    else if (endMode && newNode.isEnd){
                        newNode.isEnd = false;
                    }
                }
                else  {
                    if (startMode){
                        newNode.isStart = true;
                        setStart({row:newNode.row, col: newNode.col})
                    }
                    else if (endMode){
                        newNode.isEnd = true;
                        setEnd({row:newNode.row, col: newNode.col})
                    }
                    else if (wallMode){
                        if (!newNode.isStart && !newNode.isEnd && !newNode.isWeight){
                            newNode.isWall = true; 
                        }
                    }
                    else if (weightMode){
                         if (!newNode.isStart && !newNode.isEnd && !newNode.isWall){
                            newNode.isWeight = true; 
                        }
                    }
                    else{
                        if (!newNode.isStart && !newNode.isEnd){
                            newNode.isWall = false; 
                            newNode.isWeight = false; 
                        }
                    }
                }
                return newNode 
            })
        })
        setGrid(newGrid)
    }
    
    function findElement(grid,id){
        for (let i = 0; i < ROWS; ++i){
            for (let j = 0; j < COLS; ++j){
                if (grid[i][j].id === id){
                    return grid[i][j]
                }
            }
        }
        return null; 
    }
    
    function generateNewGrid(){
        const newGrid = []
        for (let i = 0; i < ROWS; ++i){
            const newRow = [];
            for (let j = 0; j < COLS; ++j){
                const newNode = {
                    id: `${i} ${j}`,
                    row: i,
                    col: j,
                    isStart: false,
                    isEnd: false,
                    isWall: false,
                    isWeight: false, 
                    isVisited: false,
                    isPath: false,
                }
                if (i === start.row && j === start.col){
                    newNode.isStart = true;
                }
                if (i === end.row && j === end.col){
                    newNode.isEnd = true;
                }
                newRow.push(newNode)
            }
            newGrid.push(newRow)
        }
        return newGrid
    }
    
    const gridElements = grid.map(row => {
        return (
            row.map(node => {
                return (
                    <Node
                        key={node.id}
                        id={node.id}
                        row={node.row}
                        col={node.col}
                        isStart={node.isStart}
                        isEnd={node.isEnd}
                        isWall={node.isWall}
                        isWeight={node.isWeight}
                        isVisited={node.isVisited}
                        isPath={node.isPath}
                        setMode={()=>setMode(grid,node.id)}
                        resetMode={resetMode}
                        setStartEndWalls={()=>setStartEndWalls(grid,node.id)}
                        // eraseOldStartEnd={()=>eraseOldStartEnd(grid,node.id)}
                    />
                )
            })
        )
    })
    
    function runAlgo(){
        clearPath()
        props.algo(grid,setGrid,setInProgress,start,end)
    }
    
    const styles= inProgress ? {pointerEvents: "none", opacity: 0.5}: {}
    const weightStyles = !weightedAlgo ? {pointerEvents: "none", opacity: 0.5} : {}
    return(
        <div className = "grid--page">
            <div className = "grid--container" onMouseLeave={resetMode} onMouseUp={resetMode}>
                {gridElements}
            </div>
            <div className = "grid--buttons">
                <button className="grid--button" style={styles} onClick={runAlgo}>Run Algorithm</button>
                <button className="grid--button" style={styles} onClick={clearGrid}>Clear Grid</button>
                <button className="grid--button" style={styles} onClick={clearPath}>Clear Path</button>
                <button className="grid--button" style={styles} onClick={clearWalls}>Clear Walls </button>
                <button className="grid--button" style={styles} onClick={clearWeights}>Clear Weights</button>
                <button className="grid--button" style={weightStyles} onClick={setWallsOrWeights}>{usingWalls ? "Setting Walls" : "Setting Weights"}</button>
            </div>
        </div>
    )
}





















// function eraseOldStartEnd(grid,id){
    //     if (!startMode && !endMode){
    //         return;
    //     }
    //     const newGrid = grid.map(oldRow => {
    //         return oldRow.map(oldNode => {
    //             const newNode = {...oldNode}
    //             if (newNode.id === id){
    //                 if (startMode){
    //                     newNode.isStart = false;
    //                 }
    //                 else{
    //                     newNode.isEnd = false;
    //                 }
    //             }
    //             return newNode 
    //         })
    //     })
    //     setGrid(newGrid)
    // }
    // for (let i = 0; i < ROWS; ++i){
        //     for (let j = 0; j < COLS; ++j){
        //         if (grid[i][j].id === id){
        //             if (grid[i][j].isStart){
        //                 setStartMode(true)
        //             }
        //             else if (grid[i][j].isEnd){
        //                 setEndMode(true)
        //             }
        //             else if (grid[i][j].isWall){
        //                 setClearWallMode(true)
        //             }
        //             else{
        //                 setWallMode(true)
        //             }
        //         }
        //     }
        // }