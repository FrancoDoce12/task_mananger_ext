import { useTasks } from '../../../hooks/useTasks';
import IsActiveButton from './isActiveButton';
/**
 * Displays an individual task in the sidebar with activation toggle.
 * @param {Object} props - Component props
 * @param {Object} props.task - Task data object
 * @param {string|number} props.id - Unique identifier for the task
 */
const SideBarTask = ({ task, id }) => {

    const { toggleTask, setTaskToShow } = useTasks()

    return (
        <li className='p-2' key={id}>
            <h5 className='leading-none rounded-full hover:outline hover:outline-[0.1rem] hover:outline-slate-400' onClick={() => { setTaskToShow(task) }} >{task.name}</h5>
            <IsActiveButton task={task} toggleTask={toggleTask} ></IsActiveButton>
        </li>
    );
};

export default SideBarTask;