import '../tailwind.css'
import { TaskContext, FunctionalityContext } from "./editorComponents/sharedComponents"
import MainContainer from "./editorComponents/mainContainer";
import { useState, useEffect, useRef, useMemo } from "react"
import { useTasks } from '../hooks/useTasks';
import { TaskService } from '../serviceWorkers/taskServices';

const EditorApp = () => {

    const [tasks, setTasks] = useState([])

    // used as a ref object to share vars and set functions 
    const { current } = useRef({})

    // fetch the local extencion data for the first time
    useEffect(() => {

        const fetchExtencionData = async () => {
            
            const tasksData = await TaskService.getAllTasks()

            // load the data into the app context
            current.idCounter = await TaskService.getIdCounter()
            setTasks(tasksData)
        }
        fetchExtencionData()

    }, [])


    // re calculate vars that depends on the task array
    // it runs befor the re render of this component and its
    // childs so it is a good solution to the problem
    current.activeTasksSelection = useMemo(() => {

        return TaskService.selectActiveFatherTasks(tasks)
        
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