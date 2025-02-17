import ShowTaskTreeView from "./taskComponents/ShowTaskTreeView";
import CreateNewTask from "./taskComponents/CreateNewTask";
import TaskForm from "./taskComponents/TaskForm";

const TaskViewer = ({ state, task }) => {

    if (state == "new task" || !task) {
        return (<CreateNewTask state={state} ></CreateNewTask>)
    }
    else if (state == "show selected task" || state == "show current active task") {
        // if we get here, that means that at least there are one or more tasks
        return (
            <ShowTaskTreeView
                task={task}
            >
            </ShowTaskTreeView>)
    }
    else if (state == "task form") {
        return <TaskForm />;
    }
    else {
        return <h1>{`Error TaskViewer state = ${state}`}</h1>
    }

}

export default TaskViewer