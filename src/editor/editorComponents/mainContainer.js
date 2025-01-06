import { useState, useContext } from "react"
import TaskContext from "./sharedComponents"
import SideBar from "./sideBar"
import TaskViewer from "./taskViewer"


const MainContainer = (noTasks = true) => {
    // viewContainer or main container


    const tasks = useContext(TaskContext)

    




    return (
        <div className="flex-row w-full">
            <SideBar></SideBar>
            <TaskViewer></TaskViewer>
        </div>
    )



}




export default MainContainer