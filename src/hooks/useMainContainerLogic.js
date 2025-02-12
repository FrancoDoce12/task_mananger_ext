import { useMemo, useState } from "react";
import { useTasks } from "./useTasks";

export const useMainContainerLogic = () => {

    const { tasks, refObject, getActiveTask, isActiveTask } = useTasks();

    const [taskToShow, setTaskToShow] = useState(getActiveTask());

    // states are: "show current active task", "new task", "task form"
    let [taskViewerState, setViewerState] = useState("show current active task");

    // states are: "normal", "new task", "no tasks"
    let [sideBarState, setSideBarState] = useState("normal");

    // if the viewer state is "show the current active task" and there are no tasks to show
    // set the states of sideBar to normal and taskViwewr to "new task"
    if ((isActiveTask()) && (taskViewerState == "show current active task")) {
        sideBarState = "normal";
        taskViewerState = "new task";
    }
    // always have to show a component with the posibility of create a new task
    else if (taskViewerState == "show current active task") {
        sideBarState = "new task";
    }

    useMemo(() => {
        // used to let children communicate with other children by their father
        refObject.setViewerState = setViewerState;
        refObject.setTaskToShow = setTaskToShow;
        refObject.setSideBarState = setSideBarState;

        refObject.taskToShow = taskToShow;
        refObject.taskViewerState = taskViewerState;
        refObject.sideBarState = sideBarState;

    }, [taskToShow, taskViewerState, sideBarState])


    return {
        tasks,
        refObject,
        taskToShow,
        taskViewerState,
        sideBarState
    }

}
