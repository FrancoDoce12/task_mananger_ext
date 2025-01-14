import { useContext, useState } from "react"
import TaskContext from "./sharedComponents"
import { CreateNewTask } from "./tasksComponents"
import { GetBasicComponent } from "./utils"

const TaskViewer = ({taskSelected}) => {

    const [contexTasks] = useContext(TaskContext)
    console.log("TaskViewer, context tasks", contexTasks)
    console.log(contexTasks.length)

    // content should be a component, not the result of a componente called (jsx elements)
    let Content = GetBasicComponent(<></>)

    if (contexTasks.length == 0) {
        Content = CreateNewTask
    } else {
        Content = GetBasicComponent(<p>Show current active task</p>)
    }



    return (
        <div>
            <Content></Content>
        </div>
    )
}

export default TaskViewer