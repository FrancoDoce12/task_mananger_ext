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





    const handleSubmit = (e) => {
        e.preventDefault()

        const tasksFromContext = useContext(TaskContext) // array of tasks

        // in other parts of the code the isActive parameter
        // will be activated if it's the only one task existing,
        // (meaning that the first task created will be activated)
        tasksFromContext.push({...taskData, isActivated : false})

        chrome.storage.local.set("tasks", tasksFromContext)

        

    }

    const handleChange = ({target: {name : value}}) => {
        setTaskData({...taskData, [name]: value })
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


export { SideBarTask }
