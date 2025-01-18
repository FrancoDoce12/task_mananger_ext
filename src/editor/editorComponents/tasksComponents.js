import { useContext, useState } from "react"
import TaskContext from "./sharedComponents"


const SideBarTask = (task) => {
    return (
        <li>
            <h5>{task.name}</h5>
        </li>
    )
}


const TaskForm = () => {

    const [taskData, setTaskData] = useState({})

    // 3 posible stater are: ["in progress", "completed", "loading"]
    // "in progress" is the default form state
    const [formState, setFormState] = useState("in progress")


    const handleSubmit = (e) => {
        e.preventDefault()

        const [tasksFromContext, setTasksContext] = useContext(TaskContext) // array of tasks


        const fetchData = async () => {
            // in other parts of the code the isActive parameter
            // will be activated if it's the only one task existing,
            // (meaning that the first task created will be activated)
            tasksFromContext.push({ ...taskData, isActivated: false })

            await chrome.storage.local.set({ tasks: tasksFromContext })

            setTasksContext(tasksFromContext)
            setFormState("completed")
        }
        fetchData()

        setFormState("loading")

        // TODO: add functionality to the formState with some cool animations or logos
        // played on each state


    }

    const handleChange = ({ target: { name: value } }) => {
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


const CreateNewTask = () => {

    const [state, setState] = useState("new task")

    let Content 

    const handleButton = () => {
        setState("task form")
    }

    if (state == "new task") {
        Content = (
            <div className="flex-col">
                <h1>No task selected</h1>
                <button onClick={handleButton}>
                    Create task
                </button>
            </div>
        )
    } else {
        Content = TaskForm
    }


    return Content

}


export { SideBarTask, CreateNewTask, TaskForm }
