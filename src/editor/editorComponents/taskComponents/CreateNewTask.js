import { useContext } from "react";
import { FunctionalityContext } from "../sharedComponents"; 

const CreateNewTask = () => {
    const { setViewerState } = useContext(FunctionalityContext);

    return (
        <div className="flex-col">
            <h1>No active tasks</h1>
            <button onClick={() => setViewerState("task form")}>
                Create task
            </button>
        </div>
    );
};

export default CreateNewTask;