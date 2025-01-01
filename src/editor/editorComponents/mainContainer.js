import { useState, useContext } from "react"
import TaskContext from "./sharedComponents" 


const MainContainer = (noTasks = true) => {
    // viewContainer or main container


    const tasks = useContext(TaskContext)




    return (
        <div className="mainContainer">

        </div>
    )



}




export default MainContainer