import { useState, useContext } from 'react';
import { FunctionalityContext } from '../sharedComponents';
import { useTasks } from '../../../hooks/useTasks';
import BaseInput from '../baseInput';

const formStatesKeys = {
    INITIAL_STATE: 'in progress',
    LOADING_STATE: 'loading',
    ACTION_COMPLETED_STATE: 'completed'
};


/**
 * Form component for creating or editing a task.
 */
const TaskForm = ({ fatherId = null }) => {
    // fatherId for the task what will be upladed,
    // if there is a father id that means that this task
    // will be a child of the father id
    const [taskData, setTaskData] = useState({});
    const [formState, setFormState] = useState(formStatesKeys.INITIAL_STATE);
    const { setViewerState, setSideBarState } = useContext(FunctionalityContext);

    const tasksHooks = useTasks();

    const handleSubmit = (e) => {
        e.preventDefault();

        const saveNewTaksData = async () => {
            await tasksHooks.addTask({ ...taskData, fatherId });

            setFormState(formStatesKeys.ACTION_COMPLETED_STATE);
            //update the father
            setViewerState("show current active task");
            setSideBarState("new task");
        }
        saveNewTaksData();

        setFormState(formStatesKeys.LOADING_STATE);
    };

    const handleChange = ({ target: { name, value } }) => {
        setTaskData({ ...taskData, [name]: value });
    };

    const handleUnset = ({ target: { name, value } }) => {
        setTaskData({ ...taskData, [name]: undefined });
    };

    return (

        <form className="form-style" onSubmit={handleSubmit}>

            <BaseInput
                required={true}
                inputNameId="name"
                inputType="text"
                labelText="Name"
                onChange={handleChange}
                placeholder={"Make Somthing Greate!"}
            />

            <BaseInput
                inputNameId="description"
                inputType="text"
                labelText="Description"
                onChange={handleChange}
                placeholder={"To make Somthing Greate, we need little steps.."}
            />

            <BaseInput
                inputNameId="startDate"
                inputType="date"
                labelText="Start Date"
                onChange={handleChange}
                unset={true}
                onUnset={handleUnset}
                max={taskData.endDate}
            />

            <BaseInput
                inputNameId="endDate"
                inputType="date"
                labelText="End Date"
                onChange={handleChange}
                unset={true}
                onUnset={handleUnset}
                min={taskData.startDate}
            />

            <button className="form-submit-button" type="submit">Save Changes</button>
        </form>
    );
};

export default TaskForm;