import '../tailwind.css'
import TaskContext from "./editorComponents/sharedComponents"
import MainContainer from "./editorComponents/mainContainer";
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
        <TaskContext.Provider value={tasks}>
            <div className="editorApp bg-red-50 p-12">
                <MainContainer />
            </div>
        </TaskContext.Provider>
    )
}

export default EditorApp