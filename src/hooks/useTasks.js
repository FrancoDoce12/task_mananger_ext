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
     * @property {number} startDate - The timestamp when the task was created.
     * @property {number} endDate - The timestamp when the task was created.
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

        getFatherTasks: () => {
            return TaskService.selectFatherTasks(tasks);
        },

        getChildsTasks: (fatherTask) => {
            return TaskService.selectTasksByIds(fatherTask.childsIds, tasks);
        },

        setTaskToShow: (task) => {
            return refObject.setSelectedTask(task);
        },

        // TODO: HET MAIN TASK

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

        toggleTask: async (task) => {
            const updatedTasks = await TaskService.updateTask(
                task.id,
                { isActive: !task.isActive },
                tasks
            );
            setTasks(updatedTasks);
        },
    };
};