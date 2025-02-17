import { useMemo, useState } from "react";
import { useTasks } from "./useTasks";

export const useMainContainerLogic = () => {

    const { tasks, refObject, getActiveTask } = useTasks();

    let taskToShow = useMemo(() => {
        return getActiveTask();
    }, [tasks]);

    // states are: "show current active task", "new task", "task form", "show selected task"
    let [taskViewerState, setViewerState] = useState("show current active task");

    let [selectedTask, setSelectedTask] = useState(null);

    // states are: "normal", "new task", "no tasks"
    let [sideBarState, setSideBarState] = useState("normal");

    // if the viewer state is "show the current active task" and there are no tasks to show
    // set the states of sideBar to normal and taskViwewr to "new task"
    if ((!taskToShow) && (taskViewerState == "show current active task")) {
        sideBarState = "normal";
        taskViewerState = "new task";
    }
    // always have to show a component with the posibility of create a new task
    else if (taskViewerState != "new task") {
        sideBarState = "new task";
    }
    else if (taskViewerState == "show selected task") {
        taskToShow = selectedTask;
    }

    const setSelectedTaskToShow = (task) => {
        if (task) {
            setSelectedTask(task);
            setViewerState("show selected task");
        };
    };

    useMemo(() => {
        // used to let children communicate with other children by their father
        refObject.setViewerState = setViewerState;
        refObject.setSideBarState = setSideBarState;
        refObject.setSelectedTask = setSelectedTaskToShow;

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
