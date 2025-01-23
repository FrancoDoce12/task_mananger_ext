import { useContext, useState } from "react"
import { TaskContext, FunctionalityContext } from "./sharedComponents"
import { CreateNewTask, ShowTaskView } from "./tasksComponents"

const TaskViewer = ({ state }) => {

    const [contexTasks] = useContext(TaskContext)

    const funcObject = useContext(FunctionalityContext)

    if (state == "show current active task") {
        // if we get here, that means that at least there are one or more tasks
        return (
            <ShowTaskView
                task={contexTasks[funcObject.activeTaskIndex]}>
            </ShowTaskView>)
    } else {
        return (<CreateNewTask state={state} ></CreateNewTask>)
    }

}

export default TaskViewer