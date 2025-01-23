import { useContext, useState } from "react"
import { TaskContext, FunctionalityContext } from "./sharedComponents"


const SideBarTask = (task, id) => {
    return (
        <li key={id}>
            <h5>{task.name}</h5>
        </li>
    )
}


const TaskForm = () => {

    const [taskData, setTaskData] = useState({})

    // 3 posible stater are: ["in progress", "completed", "loading"]
    // "in progress" is the default form state
    const [formState, setFormState] = useState("in progress")

    const [tasksFromContext, setTasksContext] = useContext(TaskContext) // array of tasks
    const { setViewerState, setSideBarState } = useContext(FunctionalityContext)

    const handleSubmit = (e) => {
        e.preventDefault()

        let isActive = false
        if (tasksFromContext.length == 0) { isActive = true }

        tasksFromContext.push({ ...taskData, isActive })

        const saveNewTaksData = async () => {
            await chrome.storage.local.set({ tasks: tasksFromContext })

            setFormState("completed")
            setTasksContext(tasksFromContext)
            //update the father
            setViewerState("show current active task")
            setSideBarState("new task")
        }
        saveNewTaksData()

        setFormState("loading")

        // TODO: add functionality to the formState with some cool animations or logos
        // played on each state


    }

    const handleChange = ({ target: { name, value } }) => {
        setTaskData({ ...taskData, [name]: value })
    }

    return (
        <form onSubmit={handleSubmit}>

            <label htmlFor="name">task Goal/Name</label>
            <input required id="name" name="name" type="text" placeholder="Find a job!"
                onChange={handleChange}></input>

            <label htmlFor="description">Description</label>
            <input id="description" name="description" type="text" placeholder="deliver resumes at....."
                onChange={handleChange}></input>

            <label htmlFor="start date">Start Date</label>
            <input id="start date" name="start date" type="date"
                onChange={handleChange}></input>

            <label htmlFor="End Date">End Date</label>
            <input id="End date" name="End date" type="date"
                onChange={handleChange}></input>

            <button type="submit">Done</button>

        </form>
    )
}


const CreateNewTask = ({ state }) => {

    const funcObject = useContext(FunctionalityContext)

    const handleCreateTaskButton = () => {
        funcObject.setViewerState("task form")
        console.log("test")
    }

    if (state == "new task") {
        return (
            <div className="flex-col">
                <h1>No active tasks</h1>
                <button onClick={handleCreateTaskButton}>
                    Create task
                </button>
            </div>
        )
    } else {
        return (<TaskForm></TaskForm>)
    }



}

const ShowTaskView = ({ task }) => {

    let description
    if (task.description) { description = <p>{task.description}</p> }

    let childs
    if (task.childs) { childs = task.childs }

    return (
        <div>
            <h1>{task.name}</h1>
            {description}
            {childs}
        </div>)
}


export { SideBarTask, CreateNewTask, TaskForm }
