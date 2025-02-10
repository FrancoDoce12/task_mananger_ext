import ShowTaskTreeView from "./taskComponents/ShowTaskTreeView"
import CreateNewTask from "./taskComponents/CreateNewTask"

const TaskViewer = ({ state, task }) => {

    if (state == "show current active task") {
        // if we get here, that means that at least there are one or more tasks
        return (
            <ShowTaskTreeView
                task={task}
            >
            </ShowTaskTreeView>)
    } else {
        return (<CreateNewTask state={state} ></CreateNewTask>)
    }

}

export default TaskViewer