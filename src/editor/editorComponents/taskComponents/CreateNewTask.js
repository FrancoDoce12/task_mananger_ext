import { useContext } from "react";
import { FunctionalityContext } from "../sharedComponents"; 
import TaskForm from "./TaskForm";

const CreateNewTask = ({ state }) => {
    const { setViewerState } = useContext(FunctionalityContext);

    return state === "new task" ? (
        <div className="flex-col">
            <h1>No active tasks</h1>
            <button onClick={() => setViewerState("task form")}>
                Create task
            </button>
        </div>
    ) : (
        <TaskForm />
    );
};

export default CreateNewTask;