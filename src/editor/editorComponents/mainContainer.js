import { useState, useContext, useEffect } from "react"
import { TaskContext, FunctionalityContext } from "./sharedComponents"
import SideBar from "./sideBar"
import TaskViewer from "./taskViewer"
import { useMainContainerLogic } from "../../hooks/useMainContainerLogic"


const MainContainer = () => {
    // main container

    const {sideBarState, taskViewerState, taskToShow} = useMainContainerLogic()

    return (
        <div className="flex flex-row w-full h-screen ">
            <SideBar state={sideBarState}></SideBar>
            <TaskViewer
                state={taskViewerState}
                task={taskToShow}>
            </TaskViewer>
        </div>
    )


}


export default MainContainer