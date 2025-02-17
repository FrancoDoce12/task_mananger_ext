import { useState, useContext } from 'react';
import { FunctionalityContext } from '../sharedComponents';
import { useTasks } from '../../../hooks/useTasks';

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

    return (
        <form onSubmit={handleSubmit}>

            <label htmlFor="name">task Goal/Name</label>
            <input required id="name" name="name" type="text" placeholder="Find a job!"
                onChange={handleChange}></input>

            <label htmlFor="description">Description</label>
            <input id="description" name="description" type="text" placeholder="deliver resumes at....."
                onChange={handleChange}></input>

            <label htmlFor="start date">Start Date</label>
            <input id="start date" name="startDate" type="date"
                onChange={handleChange}></input>

            <label htmlFor="End date">End Date</label>
            <input id="End date" name="endDate" type="date"
                onChange={handleChange}></input>

            <button type="submit">Done</button>
        </form>
    );
};

export default TaskForm;