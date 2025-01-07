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

            <label for="name">task Goal/Name</label>
            <input id="name" name="name" type="text" placeholder="Find a job!"
                onChange={handleChange}></input>

            <label for="name">task Goal/Name</label>
            <input id="name" name="name" type="text" placeholder="Find a job!"
                onChange={handleChange}></input>

            <label for="name">task Goal/Name</label>
            <input id="name" name="name" type="text" placeholder="Find a job!"
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
