import React, {useState} from "react"
import Navbar from "./components/Navbar"
import Tutorial from "./components/Tutorial"
import Grid from "./components/Grid"
import Djikstra from "./algorithms/Djikstra"
import BFS from "./algorithms/BFS"
import DFS from "./algorithms/DFS"
import BestFirst from "./algorithms/BestFirst"
import AStar from "./algorithms/AStar"



export default function App(){
    const algorithms = {"Djikstra": Djikstra, "Greedy Best-First Search": BestFirst, "Breadth-First Search": BFS, "Depth-First Search": DFS, "A* Search": AStar}
    
    const [currentAlgo, setCurrentAlgo] = useState("A* Search")
    const [tutorial, setTutorial] = useState(true) 
    
    function removeTutorial(){
        setTutorial(false)
    }
    
    return (
        <div className = "app--container">
            {tutorial && <Tutorial
                switchOff = {removeTutorial}
            />}
            <Navbar 
                setCurrentAlgo={setCurrentAlgo}
                currentAlgo={currentAlgo}
            />
            <Grid 
                algo={algorithms[currentAlgo]}
                algoId = {currentAlgo}
            />
        </div>
    )
}