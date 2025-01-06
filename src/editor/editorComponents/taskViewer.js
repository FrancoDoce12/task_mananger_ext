import { useContext } from "react"
import TaskContext from "./sharedComponents"

const TaskViewer = ({taskSelected}) => {

    const contexTasks = useContext(TaskContext)

    // content component can have 3 different forms
    let Content = (<></>)



    const handleCreateTask = () => {
        
    }

    if (!taskSelected) {
        Content = (
            <div className="flex-col">
            <h1>No task selected</h1>
            <button>Create task</button>
            </div>
        )
    } else {
        //Content = ()
    }


    
    return (
        <div>

        </div>
    )
}

export default TaskViewer