import { useState, useContext, useEffect } from "react"
import { TaskContext, FunctionalityContext } from "./sharedComponents"
import SideBar from "./sideBar"
import TaskViewer from "./taskViewer"


const MainContainer = (noTasks = true) => {
    // viewContainer or main container


    const [contexTasks] = useContext(TaskContext)


    // states are: "show current active task", "new task", "task form"
    let [taskViewerState, setViewerState] = useState("show current active task")

    // states are: "normal", "new task", "no tasks"
    let [sideBarState, setSideBarState] = useState("normal")


    if (contexTasks.length == 0) {
        sideBarState = "normal"
        taskViewerState = "new task"
    } else if (taskViewerState == "show current active task") {
        sideBarState = "new task"
    }



    const funcObject = useContext(FunctionalityContext)
    funcObject.setViewerState = setViewerState
    funcObject.taskViewerState = taskViewerState

    funcObject.setSideBarState = setSideBarState
    funcObject.sideBarState = sideBarState


    return (
        <div className="flex-col w-full">
            <SideBar state={sideBarState}></SideBar>
            <TaskViewer state={taskViewerState}></TaskViewer>
        </div>
    )


}


export default MainContainer