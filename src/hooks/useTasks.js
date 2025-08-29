import { useContext } from 'react';
import { TaskContext, FunctionalityContext } from '../editor/editorComponents/sharedComponents.js';
import { TaskService } from '../serviceWorkers/taskServices';
import alarmServices from '../serviceWorkers/alarmServices.js';
import { REF_OBJECT_KEYS } from '../constants/enums.js';
const { SET_SELECTED_TASK, SET_VIEWER_STATE, SET_TASKS_DATA } = REF_OBJECT_KEYS;


// task schema 
/**
     * @typedef {Object} Task
     * @property {number} id - The unique identifier for the task.
     * @property {string} name - The name of the task.
     * @property {string} description - A description of the task.
     * @property {number|null} fatherId - The ID of the parent task, if any.
     * @property {number[]} childsIds - An array of child task IDs.
     * @property {boolean} isComplete - Indicates whether the task is marked as complete. 
     * @property {Date} creationDate - The Date of the creation of the task (yyyy-mm-dd).
     * @property {Date} startDate - The Date when the task should start (yyyy-mm-dd).
     * @property {Date} endDate - The Date when the task should end or be finished (yyyy-mm-dd).
     * @property {string} color - The Task’s representative color.
 */

export const useTasks = () => {
    const [tasks, setTasks] = useContext(TaskContext);
    const refObject = useContext(FunctionalityContext);

    return {
        tasks,
        //setTasks,
        refObject,

        getTask: (taskId) => {
            return TaskService.getTaskById(taskId, tasks);
        },

        retrieveTasksData: async () => {
            return await TaskService.retrieveAllTasksData();
        },

        retrieveIdCounter: async () => {
            return await TaskService.retrieveIdCounter();
        },

        addTask: async (newTask) => {
            const updatedTasks = await TaskService.addTask(newTask, tasks, refObject);
            refObject[SET_TASKS_DATA](updatedTasks);
        },

        saveAllTasks: async (newTasks) => {
            await TaskService.saveAllTasks(newTasks);
            refObject[SET_TASKS_DATA]([...newTasks]);
        },

        getMainTasks: () => {
            return TaskService.selectMainTasks(tasks);
        },

        getChildsFromTask: (fatherTask) => {
            return TaskService.selectChildsFromTasks(fatherTask, tasks).tasks;
        },

        setSelectedTask: (task) => {
            return refObject[SET_SELECTED_TASK]((prev) => {
                if (prev?.id === task.id) { return prev; };
                return task;
            });
        },

        setViewerState: (state) => {
            return refObject[SET_VIEWER_STATE](state);
        },

        /**
         * Retrieves the currently active task using the following priority:
         * 1. Returns the first task from `refObject.activeTasksSelection.tasks` (if available).
         * 2. Falls back to the first task in the `tasks` array if no active selection exists.
         * 
         * @returns {Task | undefined} 
         *   - A `Task` object if either:
         *     - The active task selection exists, or
         *     - The `tasks` array is non-empty.
         *   - `undefined` if both:
         *     - No active task selection exists, and
         *     - The `tasks` array is empty.
         */
        getActiveTask: () => {
            const activeTask = refObject.activeTasksSelection?.tasks?.[0];
            if (!activeTask) {
                return tasks[0];
            };
            return activeTask;
        },

        getActiveMainTask: () => {
            return TaskService.getActiveMainTask(tasks);
        },

        isValidTaskId: (taskId) => {
            return TaskService.isValidTaskId(taskId, tasks);
        },

        isValidAndLoadedTask: (task) => {
            return TaskService.isValidAndLoadedTask(task, tasks);
        },

        getChildsSelection: (fatherTask) => {
            return TaskService.selectTasksByIds(fatherTask.childsIds, tasks);
        },

        getFatherTask: (task) => {
            const selection = TaskService.selectTasksByIds([task.fatherId], tasks);
            return selection.tasks[0];
        },

        toggleTask: async (task) => {
            const updatedTasks = await TaskService.updateTask(
                task.id,
                { isActive: !task.isActive },
                tasks
            );
            refObject[SET_TASKS_DATA](updatedTasks);
            alarmServices.checkAlarm(refObject, updatedTasks);
        },

        updateTask: async (task, update) => {
            const updatedTasks = (await TaskService.updateTask(task.id, update, tasks));
            refObject[SET_TASKS_DATA]([...updatedTasks]);
        },

        deleteTask: async (task) => {
            const newTasks = await TaskService.deleteTasks([task.id], tasks);
            if (newTasks) {
                refObject[SET_TASKS_DATA](newTasks);
            }
            else { console.error(`Error Deleting Task:`, task); };
        },

        /**
         * Creates the message checking the last child task completed along the tree of childs,
         * to be shown in the notification "Massages"
         * @param {Task} task 
         * @returns {string} "Notification massage"
         */
        getTaskMassage: async (task) => {

            // level of deep search along the tree
            let taskMassage = task.description;

            let lastNotCompletedChild = TaskService.getFirstNotCompleteChild(task, tasks);

            if (lastNotCompletedChild) {
                taskMassage = `${lastNotCompletedChild.name}\n${lastNotCompletedChild.description}`;
            };

            return taskMassage;
        },

        orderTasksByStartDate: (tasks) => {
            return TaskService.orderTasksByStartDate(tasks);
        },

        getRandomColor: () => {
            return TaskService.getRandomHexColor();
        },

    };
};