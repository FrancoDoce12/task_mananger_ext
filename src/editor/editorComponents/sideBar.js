import SideBarTask from "./taskComponents/SideBarTask";
import { FunctionalityContext } from "./sharedComponents";
import { useContext, useMemo } from "react";
import { useTasks } from "../../hooks/useTasks";
import { viewerStates, REF_OBJECT_KEYS } from "../../constants/enums";
const { SET_VIEWER_STATE } = REF_OBJECT_KEYS;



const SideBar = ({ isNewTaskButton }) => {

    const { getMainTasks, tasks } = useTasks();

    const contextTasks = useMemo(() => {
        return (getMainTasks()).tasks
    }, [tasks]);

    // list of the components of the list
    const tasksComponents = [];

    // load the tasks from the context to its components
    for (let i = 0; i < contextTasks.length; i++) {
        // we use the SideBarTask component
        const task = contextTasks[i]
        tasksComponents.push(
            <SideBarTask
                task={task} key={task.id} id={task.id}>
            </SideBarTask>
        )
    }

    const NewTaskButton = (
        <CreateNewTaskTab
            key={"create-new-task-button"} id={"create-new-task-button"}>
        </CreateNewTaskTab>)

    if (isNewTaskButton) {
        tasksComponents.push(NewTaskButton)
    }


    return (
        <aside className="side-bar">
            <h2 className="text-2xl p-3" >Tasks</h2>
            <nav className="text-lg list-none ">
                {tasksComponents}
            </nav>
        </aside>
    )
}


const CreateNewTaskTab = ({ id }) => {

    const current = useContext(FunctionalityContext)

    const handleClick = () => {
        current[SET_VIEWER_STATE](viewerStates.NEW_TASK_FORM);
    }

    return (
        <li className="p-2" key={id}>
            <button onClick={handleClick}>
                <h5>Add New Task +</h5>
            </button>
        </li>)
}


export default SideBar
