import { SideBarTask } from "./tasksComponents";
import TaskContext from "./sharedComponents";
import { useContext } from "react";


const SideBar = () => {

    const [contexTasks] = useContext(TaskContext)

    const tasksComponents = []

    // load the tasks from the context to its components
    for (let i = 0; i < contexTasks.length; i++ ) {
        // we use the SideBarTask component
        tasksComponents.push(SideBarTask(contexTasks[i]))
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


export default SideBar
