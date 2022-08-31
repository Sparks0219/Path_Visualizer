import React from "react"

export default function BFS(grid,setGrid,setInProgress,start,target){
    const ROWS = grid.length
    const COLS = grid[0].length
    const queue = [] 
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
    
    function runBFS(){
        queue.push({row:start.row, col:start.col})
        prev.set(`${start.row} ${start.col}`,`${start.row} ${start.col}`)
        while (queue.length){
            const curr_min = queue[0]
            queue.shift()
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
                if (target.row === newRow && target.col === newCol){
                    return true
                }
                queue.push({row:newRow,col:newCol})
            }
        }
        return false
    }
    
    const res = runBFS();
    modifyGrid(res);
}