import '../tailwind.css'
import { TaskContext, FunctionalityContext } from "./editorComponents/sharedComponents"
import MainContainer from "./editorComponents/mainContainer";
import { useState, useEffect } from "react"

const EditorApp = () => {

    const [tasks, setTasks] = useState([]);
    const [sharedFunctionality] = useState({})


    useEffect(() => {

        const fetchData = async () => {
            const tasksExtencionData = (await chrome.storage.local.get("tasks")).tasks
            setTasks(tasksExtencionData)
        }
        fetchData()

    }, [])

    // requires the tasks stored in the extencion chrome local storage
    // with an async function (getTasks)
    // then set the new tasks values retrived from the local storage
    // getTasks(setTasks) 

    return (
        <TaskContext.Provider value={[tasks, setTasks]}>
            <FunctionalityContext.Provider value={sharedFunctionality}>
                <div className="">
                    <MainContainer />
                </div>
            </FunctionalityContext.Provider>
        </TaskContext.Provider>
    )
}

export default EditorApp