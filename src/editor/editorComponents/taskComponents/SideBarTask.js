import { useTasks } from '../../../hooks/useTasks';

/**
 * Displays an individual task in the sidebar with activation toggle.
 * @param {Object} props - Component props
 * @param {Object} props.task - Task data object
 * @param {string|number} props.id - Unique identifier for the task
 */
const SideBarTask = ({ task, id }) => {

    const { toggleTask, setTaskToShow } = useTasks()

    return (
        <li key={id}>
            <h5 onClick={() => { setTaskToShow(task) }} >{task.name}</h5>
            <button onClick={() => { toggleTask(task) }}>
                {task.isActive ? 'Deactivate' : 'Activate'}
            </button>
        </li>
    );
};

export default SideBarTask;