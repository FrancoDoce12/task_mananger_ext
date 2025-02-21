import { useContext } from "react";
import { FunctionalityContext } from "../sharedComponents";
import { viewerStates } from "../../../constants/enums";

const CreateNewTask = () => {
    const refObject = useContext(FunctionalityContext);

    return (
        <div className="flex-col">
            <h1>No active tasks</h1>
            <button onClick={() => refObject.setViewerState(viewerStates.TASK_FORM)}>
                Create task
            </button>
        </div>
    );
};

export default CreateNewTask;