import React from "react"

export default function DFS(grid,setGrid,setInProgress,start,target){
    const ROWS = grid.length
    const COLS = grid[0].length
    const updates= []
    const prev = new Map() 
    const moves=[-1,0,1,0,-1]
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
    
    function runDFS(row,col){
        if (row < 0 || col < 0
            || row === ROWS
            || col === COLS
            || grid[row][col].isWall){
            return false;
        }
        if (target.row === row && target.col === col){
            return true
        }
        let res = false; 
        for (let i = 0; i < moves.length-1; ++i){
            const newRow = row+moves[i]
            const newCol = col+moves[i+1]
            if (prev.has(`${newRow} ${newCol}`)){
                continue;
            }
            updates.push(`${newRow} ${newCol}`)
            prev.set(`${newRow} ${newCol}`,`${row} ${col}`)
            res = res || runDFS(newRow,newCol)
            if (res){
                break;
            }
        }
        return res 
    }
    
    const res = runDFS(start.row,start.col);
    modifyGrid(res);
}