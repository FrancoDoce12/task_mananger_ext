import '../tailwind.css'
import { TaskContext, FunctionalityContext } from "./editorComponents/sharedComponents"
import MainContainer from "./editorComponents/mainContainer";
import { useState, useEffect, useRef, useMemo } from "react"

const EditorApp = () => {

    const [tasks, setTasks] = useState([])

    // used as a ref object to share vars and set functions 
    const { current } = useRef({})

    // fetch the local extencion data for the first time
    useEffect(() => {

        const fetchData = async () => {
            const tasksExtencionData = (await chrome.storage.local.get("tasks")).tasks
            setTasks(tasksExtencionData || [])
        }
        fetchData()

    }, [])


    // re calculate vars that depends on the task array
    // it runs befor the re render of this component and its
    // childs so it is a good solution to the problem
    current.activeTaskIndex = useMemo(() => {

        const activeTaskIndexes = []
        tasks.forEach((task, index) => {
            if (task.isActive) { activeTaskIndexes.push(index) }
        })
        // if there are no tasks, it will push a undefined value
        if (tasks.length <= 0) { current.areTasks = false }

        // if there are no active tasks and, adds the firs one
        if (activeTaskIndexes.length == 0) { activeTaskIndexes.push(0) }

        // if the value is undefined, return null
        return activeTaskIndexes[0] || null

    }, [tasks])


    return (
        <TaskContext.Provider value={[tasks, setTasks]}>
            <FunctionalityContext.Provider value={current}>
                <div className="">
                    <MainContainer />
                </div>
            </FunctionalityContext.Provider>
        </TaskContext.Provider>
    )
}

export default EditorApp