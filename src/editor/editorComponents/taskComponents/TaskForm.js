import { useState, useContext } from 'react';
import { FunctionalityContext } from '../sharedComponents';
import { useTasks } from '../../../hooks/useTasks';
import BaseInput from '../baseInput';
import { viewerStates, formStateKeys } from '../../../constants/enums';


const TaskForm = ({ fatherId = null }) => {
    // fatherId for the task what will be upladed,
    // if there is a father id that means that this task
    // will be a child of the father id
    const tasksHooks = useTasks();

    const [taskData, setTaskData] = useState({
        color: tasksHooks.getRandomColor()
    });

    const [formState, setFormState] = useState(formStateKeys.INITIAL_STATE);
    const { setViewerState } = useContext(FunctionalityContext);


    const handleSubmit = (e) => {
        e.preventDefault();

        const saveNewTaksData = async () => {
            await tasksHooks.addTask({ ...taskData, fatherId });

            setFormState(formStateKeys.ACTION_COMPLETED_STATE);
            //update the father
            setViewerState(viewerStates.SCREEN_TASK);
        }
        saveNewTaksData();

        setFormState(formStateKeys.LOADING_STATE);
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
                inputNameId="color"
                inputType="color"
                labelText="Task color"
                onChange={handleChange}
                value={taskData.color}
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