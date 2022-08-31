import React from "react"

export default function Djikstra(grid,setGrid,setInProgress,start,target){
    const ROWS = grid.length
    const COLS = grid[0].length
    const distances = []
    const scores = []
    const updates= []
    const prev = new Map() 
    const moves=[0,1,0,-1,0]
    setInProgress(true)
    
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
    
    function initializeScores(){
        for (let i = 0; i < ROWS; ++i){
            for (let j = 0; j < COLS; ++j){
                const node = {row:i, col:j, dis:Infinity}
                distances.push(node)
                scores.push(node)
            }
        }
    }
    function runDjikstra(){
        scores[start.row*COLS+start.col].dis = 0;
        prev.set(`${start.row} ${start.col}`,`${start.row} ${start.col}`)
        while (distances.length){
            distances.sort((a, b) => {
                return a.dis - b.dis;
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
    const res = runDjikstra();
    modifyGrid(res);
}