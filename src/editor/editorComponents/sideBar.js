import SideBarTask from "./taskComponents/SideBarTask";
import { TaskContext, FunctionalityContext } from "./sharedComponents";
import { useContext, useState } from "react";


const SideBar = ({ state }) => {

    const [contexTasks] = useContext(TaskContext)

    // list of the components of the list
    const tasksComponents = []

    // load the tasks from the context to its components
    for (let i = 0; i < contexTasks.length; i++) {
        // we use the SideBarTask component
        const task = contexTasks[i]
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
        <aside className="flex-col w-2/12 text-center bg-violet-500">
            <h2>Tasks</h2>
            <nav className="flex-col">
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
        <li key={id}>
            <button onClick={handleClick}>
                <h5>Add New Task +</h5>
            </button>
        </li>)
}


export default SideBar
