import { useMemo, useState } from "react";
import { useTasks } from "./useTasks";
import { viewerStates, sideBarStates } from "../constants/enums";

export const useMainContainerLogic = () => {

    const { tasks, refObject, getActiveTask } = useTasks();

    let taskToShow = useMemo(() => {
        return getActiveTask();
    }, [tasks]);

    // states are: "show current active task", "new task", "task form", "show selected task"
    let [taskViewerState, setViewerState] = useState(viewerStates.SHOW_CURRENT_ACTIVE_TASK);

    let [selectedTask, setSelectedTask] = useState({});

    // states are: "normal", "new task", "no tasks"
    let [sideBarState, setSideBarState] = useState(sideBarStates.NORMAL);
    //2664 619008 - victor

    // if the viewer state is "show the current active task" and there are no tasks to show
    // set the states of sideBar to normal and taskViwewr to "new task"
    if ((!taskToShow) && (taskViewerState == viewerStates.SHOW_CURRENT_ACTIVE_TASK)) {
        sideBarState = sideBarStates.NORMAL;
        taskViewerState = viewerStates.NEW_TASK;
    }
    // always have to show a component with the posibility of create a new task
    if (taskViewerState != viewerStates.NEW_TASK) { sideBarState = sideBarStates.NEW_TASK; };

    if (taskViewerState == viewerStates.SHOW_SELECTED_TASK) { taskToShow = selectedTask; };


    const setSelectedTaskToShow = useMemo(() => {
        return (task) => {
            if (task) {
                setSelectedTask(task);
                setViewerState(viewerStates.SHOW_SELECTED_TASK);
            };
        }
    }, [taskViewerState, selectedTask]);

    const setChildForm = useMemo(() => {
        return () => {
            setViewerState(viewerStates.CHILD_FORM);
        };
    }, [taskViewerState]);

    useMemo(() => {
        // used to let children communicate with other children by their father
        refObject.setViewerState = setViewerState;
        refObject.setSideBarState = setSideBarState;
        refObject.setSelectedTask = setSelectedTaskToShow;
        refObject.setChildForm = setChildForm;

        refObject.taskViewerState = taskViewerState;
        refObject.sideBarState = sideBarState;
        refObject.selectedTask = selectedTask;

    }, [taskViewerState, sideBarState, selectedTask])


    return {
        tasks,
        refObject,
        taskToShow,
        taskViewerState,
        sideBarState
    }

}
