import { useContext } from 'react';
import { TaskContext, FunctionalityContext } from '../editor/editorComponents/sharedComponents.js';
import { TaskService } from '../serviceWorkers/taskServices';

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
            refObject.setTaskToShow(task);
        },

        getActiveTask: () => {
            return refObject.activeTasksSelection?.tasks?.[0];
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