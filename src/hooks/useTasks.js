import { useContext } from 'react';
import { TaskContext, FunctionalityContext } from '../editor/editorComponents/sharedComponents.js';
import { TaskService } from '../serviceWorkers/taskServices';


// task schema 
/**
     * @typedef {Object} Task
     * @property {number} id - The unique identifier for the task.
     * @property {string} name - The name of the task.
     * @property {string} description - A description of the task.
     * @property {number|null} fatherId - The ID of the parent task, if any.
     * @property {number[]} childsIds - An array of child task IDs.
     * @property {Date} creationDate - The Date of the creation of the task (yyyy-mm-dd).
     * @property {Date} startDate - The Date when the task should start (yyyy-mm-dd).
     * @property {Date} endDate - The Date when the task should end or be finished (yyyy-mm-dd).
 */

export const useTasks = () => {
    const [tasks, setTasks] = useContext(TaskContext);
    const refObject = useContext(FunctionalityContext);

    return {
        tasks,

        refObject,

        addTask: async (newTask) => {
            const updatedTasks = await TaskService.addTask(newTask, tasks, refObject);
            setTasks(updatedTasks);
        },

        getMainTasks: () => {
            return TaskService.selectMainTasks(tasks);
        },

        getChildsTasks: (fatherTask) => {
            return TaskService.selectTasksByIds(fatherTask.childsIds, tasks);
        },

        setSelectedTask: (task) => {
            return refObject.setSelectedTask(task);
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
            setTasks(updatedTasks);
        },

        updateTask: async (task, update) => {
            const updatedTasks = (await TaskService.updateTask(task.id, update, tasks));
            setTasks(updatedTasks);
        },

        deleteTask: async (task) => {
            const newTasks = await TaskService.deleteTasks([task.id], tasks);
            if (newTasks) { setTasks(newTasks); }
            else { console.error(`Error Deleting Task:`, task); };
        },

        orderTasksByStartDate: (tasks) => {
            return TaskService.orderTasksByStartDate(tasks);
        },

    };
};