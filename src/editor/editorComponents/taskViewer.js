import { useContext, useState } from "react"
import TaskContext from "./sharedComponents"
import { CreateNewTask } from "./tasksComponents"

const TaskViewer = ({taskSelected}) => {

    const [contexTasks] = useContext(TaskContext)

    let Content = (<></>)

    if (contexTasks.length == 0) {
        Content = (<CreateNewTask></CreateNewTask>)
    } else {
        Content = (<>Show current active task</>)
    }



    return Content
}

export default TaskViewer