import { useState, useContext, useEffect } from "react"
import { TaskContext, FunctionalityContext } from "./sharedComponents"
import SideBar from "./sideBar"
import TaskViewer from "./taskViewer"


const MainContainer = () => {
    // viewContainer or main container

    const [contexTasks] = useContext(TaskContext)

    const funcObject = useContext(FunctionalityContext)

    const [taskToShow, setTaskToShow] = useState(funcObject.activeTasksSelection.tasks[0])

    // states are: "show current active task", "new task", "task form"
    let [taskViewerState, setViewerState] = useState("show current active task")

    // states are: "normal", "new task", "no tasks"
    let [sideBarState, setSideBarState] = useState("normal")

    // if the viewer state is "show the current active task" and there are no tasks to show
    // set the states of sideBar to normal and taskViwewr to "new task"
    if ((contexTasks.length == 0) && (taskViewerState == "show current active task")) {
        sideBarState = "normal"
        taskViewerState = "new task"
    }
    // always have to show a component with the posibility of create a new task
    else if (taskViewerState == "show current active task") {
        sideBarState = "new task"
    }


    // used to let children communicate with other children by their father
    funcObject.setViewerState = setViewerState
    funcObject.setTaskToShow = setTaskToShow
    funcObject.setSideBarState = setSideBarState

    funcObject.taskToShow = taskToShow
    funcObject.taskViewerState = taskViewerState
    funcObject.sideBarState = sideBarState


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