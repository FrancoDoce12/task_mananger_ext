import { SideBarTask } from "./tasksComponents";
import { TaskContext, FunctionalityContext } from "./sharedComponents";
import { useContext, useState } from "react";


const SideBar = ({ state }) => {

    const [contexTasks] = useContext(TaskContext)

    const tasksComponents = []

    // load the tasks from the context to its components
    for (let i = 0; i < contexTasks.length; i++) {
        // we use the SideBarTask component
        tasksComponents.push(
            <SideBarTask
                task={contexTasks[i]} key={i} id={i}>
            </SideBarTask>
        )
    }

    const NewTaskButton = (
        <CreateNewTaskTab
            key={tasksComponents.length} id={tasksComponents.length}>
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
