import SideBarTask from "./taskComponents/SideBarTask";
import { FunctionalityContext } from "./sharedComponents";
import { useContext, useMemo } from "react";
import { useTasks } from "../../hooks/useTasks";


const SideBar = ({ state }) => {

    const { getFatherTasks, tasks } = useTasks();

    const contextTasks = useMemo(() => {
        return (getFatherTasks()).tasks
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

    if (state == "new task") {
        tasksComponents.push(NewTaskButton)
    }


    return (
        <aside className="w-2/12 text-center shadow-lg bg-slate-100 ">
            <h2 className="text-2xl p-3" >Tasks</h2>
            <nav className="text-lg list-none ">
                {tasksComponents}
            </nav>
        </aside>
    )
}


const CreateNewTaskTab = ({ id }) => {

    const { setViewerState } = useContext(FunctionalityContext)

    const handleClick = () => {
        setViewerState("task form")
    }

    return (
        <li className="p-2"  key={id}>
            <button onClick={handleClick}>
                <h5>Add New Task +</h5>
            </button>
        </li>)
}


export default SideBar
