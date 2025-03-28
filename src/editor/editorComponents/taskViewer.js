import ShowTaskTreeView from "./taskComponents/ShowTaskTreeView";
import CreateNewTask from "./taskComponents/CreateNewTask";
import TaskForm from "./taskComponents/TaskForm";
import TaskDetail from "./taskComponents/taskDetail";
import { viewerStates } from "../../constants/enums";

const TaskViewer = ({ state, task }) => {

    if (state == viewerStates.TASK_FORM) {
        return (
            <div className="view-container">
                <TaskForm />
            </div>
        );
    }
    else if (state == viewerStates.CHILD_FORM) {
        return (
            <div className="view-container">
                <TaskForm fatherId={task.id} />
            </div>
            );
    }
    else if (state == viewerStates.NEW_TASK || !task) {
        return (
            <div className="view-container">
                <CreateNewTask state={state} ></CreateNewTask>
            </div>
        );
    }
    else if (state == viewerStates.SHOW_SELECTED_TASK || state == viewerStates.SHOW_CURRENT_ACTIVE_TASK) {
        // if we get here, that means that at least there are one or more tasks
        return (
            <div className="view-container">
                <ShowTaskTreeView
                    task={task}>
                </ShowTaskTreeView>
                <TaskDetail
                    task={task}>
                </TaskDetail>
            </div>
        );
    }
    else {
        return <h1>{`Error TaskViewer state = ${state}`}</h1>
    }
}

export default TaskViewer