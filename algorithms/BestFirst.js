import React from "react"

export default function BestFirst(grid,setGrid,setInProgress,start,target){
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
        // const dx1 = row-target.row
        // const dy1 = col-target.col
        // const dx2 = start.row-target.row
        // const dy2 = start.col-target.col
        // const cross = Math.abs(dx1*dy2 - dx2*dy1)
        // return rowDiff+colDiff+cross*0.001
    }
    
    function modifyGrid(found){
        const path = []
        let count = 0;
        if (found){
            let node = `${target.row} ${target.col}`;
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
                const node = {row:i, col:j, heuristic: manhattanDistance(i,j)}
                scores.push(node)
            }
        }
    }
    
    function runBestFirst(){
        distances.push(scores[start.row*COLS+start.col]);
        prev.set(`${start.row} ${start.col}`,`${start.row} ${start.col}`)
        while (distances.length){
            distances.sort((a, b) => {
                return a.heuristic - b.heuristic;
            })
            const curr_min = distances[0]
            distances.shift()
            updates.push(`${curr_min.row} ${curr_min.col}`)
            for (let i = 0; i < moves.length-1; ++i){
                const newRow = curr_min.row+moves[i]
                const newCol = curr_min.col+moves[i+1]
                if (newRow < 0 || newCol < 0
                    || newRow === ROWS
                    || newCol === COLS
                    || grid[newRow][newCol].isWall
                    || prev.has(`${newRow} ${newCol}`)){
                    continue;
                }
                prev.set(`${newRow} ${newCol}`,`${curr_min.row} ${curr_min.col}`)
                if (target.row === curr_min.row && target.col === curr_min.col){
                    return true
                }
                distances.push(scores[newRow*COLS+newCol])
            }
        }
        return false
    }
    
    initializeScores();
    const res = runBestFirst();
    modifyGrid(res);
}