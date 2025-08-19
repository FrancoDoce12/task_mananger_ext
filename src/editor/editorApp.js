import '../tailwind.css';
import { TaskContext, FunctionalityContext } from "./editorComponents/sharedComponents"
import MainContainer from "./editorComponents/mainContainer";
import { useState, useEffect, useRef, useMemo } from "react"
import { TaskService } from '../serviceWorkers/taskServices';
import alarmServices from '../serviceWorkers/alarmServices';
import { dataKeyWords, REF_OBJECT_KEYS } from '../constants/enums';
const { SET_TASKS_DATA, ID_COUNTER } = REF_OBJECT_KEYS;
const { ALARM_DATA_KEY } = dataKeyWords;

const EditorApp = () => {

    // main app state??
    const [tasks, setTasks] = useState([]);
    // avalible for child comunication
    // used as a ref object to share vars and set functions 
    const { current } = useRef({});

    current[SET_TASKS_DATA] = setTasks;


    // fetch the local extencion data for the first time
    // useEffect(() => {

    //     const fetchExtencionData = async () => {

    //         const tasksData = await TaskService.retrieveAllTasksData()

    //         // load the data into the app context
    //         current.idCounter = await TaskService.retrieveIdCounter()

    //         current[ALARM_DATA_KEY] = await alarmServices.fetchAlarmData()
    //         setTasks(tasksData)
    //     }
    //     fetchExtencionData()

    // }, [])


    return (
        <TaskContext.Provider value={[tasks, setTasks]}>
            <FunctionalityContext.Provider value={current}>
                <MainContainer />
            </FunctionalityContext.Provider>
        </TaskContext.Provider>
    )
}

export default EditorApp