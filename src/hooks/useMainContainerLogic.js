import { useEffect, useMemo, useState } from "react";
import { useTasks } from "./useTasks";
import { viewerStates } from "../constants/enums";
import { TaskService } from "../serviceWorkers/taskServices";
import alarmServices from "../serviceWorkers/alarmServices";
import { REF_OBJECT_KEYS } from "../constants/enums";
const { SET_TASKS_DATA, ID_COUNTER, SET_SELECTED_TASK, SET_VIEWER_STATE, ALARM_DATA_KEY } = REF_OBJECT_KEYS;

export const useMainContainerLogic = () => {

    const { tasks, refObject, retrieveTasksData, retrieveIdCounter,
        isValidAndLoadedTask, getActiveMainTask
    } = useTasks();

    // ----------- fetchExtencionData -----------
    useEffect(() => {
        const fetchExtencionData = async () => {

            const tasksData = await retrieveTasksData();

            // load the data into the app context
            refObject[ID_COUNTER] = await retrieveIdCounter();
            refObject[ALARM_DATA_KEY] = await alarmServices.fetchAlarmData();

            refObject[SET_TASKS_DATA](tasksData);
        }
        fetchExtencionData();
    }, []);


    let [taskViewerState, setViewerState] = useState(viewerStates.SCREEN_TASK);

    let [selectedTask, setSelectedTask] = useState(null);

    // setting the setFunctions reference for upward children comunication with main app state
    refObject[SET_VIEWER_STATE] = setViewerState;
    refObject[SET_SELECTED_TASK] = setSelectedTask;

    // --------------- main logic ---------------


    // side bar prop
    let isSideBarNewTaskButton = useMemo(() => {
        // is the viewer state is NEW_TASK_SCREEN or NEW_TASK_SCREEN, don't show the new task button
        return (!(taskViewerState == viewerStates.NEW_TASK_SCREEN || taskViewerState == viewerStates.NEW_TASK_FORM))
    }, [taskViewerState]);

    let screenTask = useMemo(() => {
        if (isValidAndLoadedTask(selectedTask, tasks)) {
            return selectedTask;
        } else {
            return getActiveMainTask(tasks);
        };
    }, [tasks, selectedTask]);




    // // if the viewer state is "show the current active task" and there are no tasks to show
    // // set the states of sideBar to normal and taskViwewr to "new task"
    // if ((!taskToShow) && (taskViewerState == viewerStates.SHOW_CURRENT_ACTIVE_TASK)) {
    //     sideBarState = sideBarStates.NORMAL;
    //     taskViewerState = viewerStates.NEW_TASK;
    // }
    // // always have to show a component with the posibility of create a new task
    // if (taskViewerState != viewerStates.NEW_TASK) { sideBarState = sideBarStates.NEW_TASK; };

    // // the selected task has priority over default tasks assinged before
    // if (selectedTask) { taskToShow = selectedTask; };

    // const setSelectedTaskToShow = useMemo(() => {
    //     return (task) => {
    //         if (task) {
    //             setSelectedTask(task);
    //             setViewerState(viewerStates.SHOW_SELECTED_TASK);

    //             if (refObject.showTaskTreeViewInitialaized) {
    //                 refObject.changeTreeViewTask(task);
    //             };
    //         };
    //     };
    // }, [taskViewerState, selectedTask]);

    // const setChildForm = useMemo(() => {
    //     return () => {
    //         setViewerState(viewerStates.CHILD_FORM);
    //     };
    // }, [taskViewerState]);

    // useMemo(() => {
    //     // used to let children communicate with other children by their father
    //     refObject.setViewerState = setViewerState;
    //     refObject.setSideBarState = setSideBarState;
    //     refObject.setSelectedTask = setSelectedTaskToShow;
    //     refObject.setChildForm = setChildForm;

    //     refObject.taskViewerState = taskViewerState;
    //     refObject.sideBarState = sideBarState;
    //     refObject.selectedTask = selectedTask;

    // }, [taskViewerState, sideBarState, selectedTask])



    return {
        screenTask,
        isSideBarNewTaskButton,
        taskViewerState
    }

}

// const fetchExtencionData = async () => {

//     const tasksData = await TaskService.retrieveAllTasksData();

//     // load the data into the app context
//     current.idCounter = await TaskService.retrieveIdCounter();

//     current[ALARM_DATA_KEY] = await alarmServices.fetchAlarmData();
//     TaskService.saveAllTasks(tasksData);
// }
