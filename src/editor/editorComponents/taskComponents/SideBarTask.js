import { useTasks } from '../../../hooks/useTasks';
import IsActiveButton from './isActiveButton';
import { viewerStates, defaultColor } from '../../../constants/enums';
const { SCREEN_TASK } = viewerStates
/**
 * Displays an individual task in the sidebar with activation toggle.
 * @param {Object} props - Component props
 * @param {Object} props.task - Task data object
 * @param {string|number} props.id - Unique identifier for the task
 */
const SideBarTask = ({ task, id }) => {

    const { toggleTask, setSelectedTask, setViewerState } = useTasks();

    return (
        <li className='p-2' key={id}>
            <h5
                style={{ outlineColor: task.color || defaultColor}}
                className='side-bar-task-header'
                onClick={() => { setSelectedTask(task); setViewerState(SCREEN_TASK); }}
            >{task.name}</h5>
            <IsActiveButton task={task} toggleTask={toggleTask} ></IsActiveButton>
        </li>
    );
};

export default SideBarTask;