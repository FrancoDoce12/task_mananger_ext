import ShowTaskTreeView from "./taskComponents/ShowTaskTreeView";
import CreateNewTask from "./taskComponents/CreateNewTask";
import TaskForm from "./taskComponents/TaskForm";
import TaskDetail from "./taskComponents/taskDetail";
import { viewerStates } from "../../constants/enums";
import { ReactFlowProvider } from "@xyflow/react";

const TaskViewer = ({ state, screenTask }) => {

    // if the screenTask in null, and there is no creation task, or no task state, set the state to no task (NEW_TASK_SCREEN)
    if ((!screenTask) && ((state != viewerStates.NEW_TASK_FORM) || (state != viewerStates.NEW_TASK_SCREEN))) {
        state = viewerStates.NEW_TASK_SCREEN;
    };

    switch (state) {
        case viewerStates.NEW_TASK_SCREEN:
            return (
                <div className="view-container">
                    <CreateNewTask state={state} ></CreateNewTask>
                </div>
            );
        case viewerStates.NEW_TASK_FORM:
            return (
                <div className="view-container">
                    <TaskForm />
                </div>
            );
        case viewerStates.NEW_CHILD_FORM:
            return (
                <div className="view-container">
                    <TaskForm fatherId={screenTask.id} />
                </div>
            );
        case viewerStates.SCREEN_TASK:
            return (
                <div style={{ with: "100%", height: "100%" }} className="view-container">
                    <ReactFlowProvider>
                        <ShowTaskTreeView
                            task={screenTask}>
                        </ShowTaskTreeView>
                        <TaskDetail
                            task={screenTask}>
                        </TaskDetail>
                    </ReactFlowProvider>
                </div>
            );
        default:
            return (<h1>{`Error TaskViewer state = ${state}`}</h1>);
    };
}

export default TaskViewer;