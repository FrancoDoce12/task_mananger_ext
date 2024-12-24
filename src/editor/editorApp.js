import TaskContext from "../sharedComponents/taskContex"
import ViewerContainer from "./viewContainer/vewContainer"
import { useState, useEffect } from "react"

const EditorApp = () => {

    const [tasks, setTasks] = useState([]);


    useEffect(() => {

        const fetchData = async () => {
            setTasks(await chrome.storage.local.get("tasks"))
        }
        fetchData()

    }, [])

    // requires the tasks stored in the extencion chrome local storage
    // with an async function (getTasks)
    // then set the new tasks values retrived from the local storage
    // getTasks(setTasks) 

    return (
        <TaskContext.Provider value = {tasks}>
            <div className="editorApp">
                <ViewerContainer />
            </div>
        </TaskContext.Provider>
    )
}

export default EditorApp