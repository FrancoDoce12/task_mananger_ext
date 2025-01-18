import { useState, useContext, useEffect } from "react"
import { TaskContext, FunctionalityContext } from "./sharedComponents"
import SideBar from "./sideBar"
import TaskViewer from "./taskViewer"


const MainContainer = (noTasks = true) => {
    // viewContainer or main container


    const [contexTasks] = useContext(TaskContext)


    console.log(contexTasks)

    // states are: "show current active task", "new task", "task form"
    let taskViewerInitialStatte
    if (contexTasks.length == 0) { taskViewerInitialStatte = "new task" }
    else { taskViewerInitialStatte = "show current active task" }
    const [taskViewerState, setViewerState] = useState(taskViewerInitialStatte)


    // states are: "normal", "new task", "no tasks"
    let sideBarInitialState = "normal"
    if (taskViewerState == "show current active task") { sideBarInitialState = "new task" }
    const [sideBarState, setSideBarState] = useState(sideBarInitialState)




    console.log(taskViewerState)
    console.log(sideBarState)

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