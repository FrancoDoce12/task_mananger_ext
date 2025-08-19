import { useContext } from "react";
import { FunctionalityContext } from "../sharedComponents";
import { viewerStates, REF_OBJECT_KEYS } from "../../../constants/enums";
const { SET_VIEWER_STATE } = REF_OBJECT_KEYS

const CreateNewTask = () => {
    const refObject = useContext(FunctionalityContext);

    return (
        <div className="flex-col">
            <h1>No active tasks</h1>
            <button onClick={() => refObject[SET_VIEWER_STATE](viewerStates.NEW_TASK_FORM)}>
                Create task
            </button>
        </div>
    );
};

export default CreateNewTask;