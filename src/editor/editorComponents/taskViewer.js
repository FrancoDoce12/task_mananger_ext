import { useContext, useState } from "react"
import { TaskContext, FunctionalityContext } from "./sharedComponents"
import ShowTaskTreeView from "./taskComponents/ShowTaskTreeView"
import CreateNewTask from "./taskComponents/CreateNewTask"

const TaskViewer = ({ state }) => {

    const [contexTasks] = useContext(TaskContext)

    const funcObject = useContext(FunctionalityContext)

    if (state == "show current active task") {
        // if we get here, that means that at least there are one or more tasks
        return (
            <ShowTaskTreeView
                task={contexTasks[funcObject.activeTaskIndex]}
                treePositionStr={String(funcObject.activeTaskIndex)}
            >
            </ShowTaskTreeView>)
    } else {
        return (<CreateNewTask state={state} ></CreateNewTask>)
    }

}

export default TaskViewer