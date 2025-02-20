import ShowTaskTreeView from "./taskComponents/ShowTaskTreeView";
import CreateNewTask from "./taskComponents/CreateNewTask";
import TaskForm from "./taskComponents/TaskForm";
import TaskDetail from "./taskComponents/taskDetail";
import { viewerStates } from "../../constants/enums";

const TaskViewer = ({ state, task }) => {

    if (state == viewerStates.NEW_TASK || !task) {
        return (<CreateNewTask state={state} ></CreateNewTask>)
    }
    else if (state == viewerStates.SHOW_SELECTED_TASK || state == viewerStates.SHOW_CURRENT_ACTIVE_TASK) {
        // if we get here, that means that at least there are one or more tasks
        return (<>
            <TaskDetail
                task={task}>
            </TaskDetail>
            <ShowTaskTreeView
                task={task}>
            </ShowTaskTreeView>
        </>)
    }
    else if (state == viewerStates.TASK_FORM) {
        return <TaskForm />;
    }
    else if (state == viewerStates.CHILD_FORM) {
        return <TaskForm fatherId={task.id} />;
    }
    else {
        return <h1>{`Error TaskViewer state = ${state}`}</h1>
    }

}

export default TaskViewer