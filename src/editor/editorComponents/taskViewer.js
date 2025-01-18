import { useContext, useState } from "react"
import { TaskContext, FunctionalityContext } from "./sharedComponents"
import { CreateNewTask } from "./tasksComponents"

const TaskViewer = ({ state }) => {

    const [contexTasks] = useContext(TaskContext)

    let Content = (<></>)

    if (state == "show current active task") {
        Content = (<>Show current active task</>)
    } else {
        Content = (<CreateNewTask state = {state} ></CreateNewTask>)
    }



    return Content
}

export default TaskViewer