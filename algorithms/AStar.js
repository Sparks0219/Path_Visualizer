import React from "react"

export default function AStar(grid,setGrid,setInProgress,start,target){
    const ROWS = grid.length
    const COLS = grid[0].length
    const distances = []
    const scores = []
    const updates= []
    const prev = new Map() 
    const moves=[0,1,0,-1,0]
    setInProgress(true)
    
    function manhattanDistance(row,col){
        const rowDiff = Math.abs(row-target.row)
        const colDiff = Math.abs(col-target.col)
        const penalty = checkLevelsForWeights(row,col)
        return rowDiff+colDiff+penalty*4
    }
    
    function modifyGrid(found){
        const path = []
        if (found){
            let node = `${target.row} ${target.col}`
            while (prev.get(node) !== `${start.row} ${start.col}`){
                path.push(node);
                node = prev.get(node)
            }
            path.push(node);
            path.reverse()
        }
        for (let i = 0; i < updates.length; ++i){
            setTimeout(() => {
                setGrid(grid => grid.map(oldRow => {
                    return oldRow.map(oldNode => {
                        const newNode = {...oldNode}
                        if (updates[i] === newNode.id){
                            newNode.isVisited = true
                        }
                        return newNode 
                    })
                }))
                if (!found && i === updates.length-1){
                    setInProgress(false)
                    return
                }
            },20*(i+1))
        }
        for (let i = 0; i < path.length; ++i){
            setTimeout(() => {
                setGrid(grid => grid.map(oldRow => {
                    return oldRow.map(oldNode => {
                        const newNode = {...oldNode}
                        if (path[i] === newNode.id){
                            newNode.isPath = true
                        }
                        return newNode 
                    })
                }))
                if (i === path.length-1){
                    setInProgress(false)
                }
            },20*updates.length+50*(i+1))    
        }
    }
    
    function checkLevelsForWeights(row,col){
        const seen = new Set()
        const queue = []
        queue.push({row:row, col:col})
        seen.add(`${row} ${col}`)
        let count = 0;
        let dis = 0;
        while (dis < 5 && queue.length){
            let allWeights = true; 
            let allWalls = true; 
            for (let i = 0, n = queue.length; i < n; ++i){
                const curr_min = queue[0]
                queue.shift()
                if (target.row === curr_min.row && target.col === curr_min.col){
                    return count 
                }
                if (!grid[curr_min.row][curr_min.col].isWall){
                    if (!grid[curr_min.row][curr_min.col].isWeight){
                        allWeights = false;
                    }
                    allWalls = false; 
                }
                for (let j = 0; j < moves.length-1; ++j){
                    const newRow = curr_min.row+moves[j]
                    const newCol = curr_min.col+moves[j+1]
                    if (newRow < 0 || newCol < 0
                        || newRow === ROWS
                        || newCol === COLS
                        || seen.has(`${newRow} ${newCol}`)
                        || grid[newRow][newCol].isWall){
                        continue;
                    }
                    seen.add(`${newRow} ${newCol}`)
                    queue.push({row:newRow,col:newCol})
                }
            }
            if (allWalls){
                return count 
            }
            if (allWeights){
                ++count
            }
            ++dis
        }
        return count
    }
    
    function initializeScores(){
        for (let i = 0; i < ROWS; ++i){
            for (let j = 0; j < COLS; ++j){
                const node = {row:i, col:j, dis:Infinity, heuristic: manhattanDistance(i,j)}
                distances.push(node)
                scores.push(node)
            }
        }
    }
    function runAStar(){
        scores[start.row*COLS+start.col].dis = 0;
        prev.set(`${start.row} ${start.col}`,`${start.row} ${start.col}`)
        while (distances.length){
            distances.sort((a, b) => {
                return (a.dis+a.heuristic) - (b.dis+b.heuristic) || a.heuristic - b.heuristic;
            })
            const curr_min = distances[0]
            if (curr_min.dis === Infinity){
                break; 
            }
            if (target.row === curr_min.row && target.col === curr_min.col){
                return true
            }
            distances.shift()
            updates.push(`${curr_min.row} ${curr_min.col}`)
            for (let i = 0; i < moves.length-1; ++i){
                const newRow = curr_min.row+moves[i]
                const newCol = curr_min.col+moves[i+1]
                const newDis = grid[curr_min.row][curr_min.col].isWeight ? curr_min.dis+5 : curr_min.dis+1
                if (newRow < 0 || newCol < 0
                    || newRow === ROWS
                    || newCol === COLS
                    || grid[newRow][newCol].isWall){
                    continue;
                }
                if (scores[newRow*COLS+newCol].dis > newDis){
                    scores[newRow*COLS+newCol].dis = newDis
                    prev.set(`${newRow} ${newCol}`,`${curr_min.row} ${curr_min.col}`)
                }
            }
        }
        return false
    }
    
    initializeScores();
    const res = runAStar();
    modifyGrid(res);
}