import { useContext, useState } from "react"
import TaskContext from "./sharedComponents"
import { CreateNewTask } from "./tasksComponents"

const TaskViewer = ({taskSelected}) => {

    const [contexTasks] = useContext(TaskContext)

    let Content = (<></>)

    if (contexTasks.length == 0) {
        Content = CreateNewTask
    } else {
        Content = (<>Show current active task</>)
    }



    return (
        <div>
            <Content></Content>
        </div>
    )
}

export default TaskViewer