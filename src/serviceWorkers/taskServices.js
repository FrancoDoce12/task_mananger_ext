
/**
 * Used for reference only
 */

import { dataKeyWords } from "../constants/enums";

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

/**
 * @typedef {Object} SelectionError
 * @property {string} msg - Human-readable error message listing missing IDs
 * @property {string[]} idsNotFound - Array of IDs that weren't found in the task list
 */


/**
 * @typedef {Object} Selection
 * @property {Array<Task|null>} tasks - The array of each tasks obj selected.
 * @property {Array<number|null>} indexes Original array positions of the matched tasks,
 *                              preserving referential integrity to the source collection.
 *                              Enables direct index-based operations on the parent tasks array.
 * @property {SelectionError|false} err - The error object if the selection get any error selecting items
 */


export const TaskService = {


    // property param is a string
    getProperty: async function (property) {
        let result;
        try {
            result = await chrome.storage.local.get(property);
            result = result[property];
        } catch (err) {
            console.error(`Error loading ${property} from chrome storage:`, err);
            return null;
        }
        return result;
    },

    setProperties: async function (updates) {

        try {
            await chrome.storage.local.set(updates);
        } catch (err) {
            console.error(`Error saving: ${updates} to chrome storage:`, err);
            return false;
        }
        return true;
    },

    // gets the tasks using the getProperty function
    getAllTasks: async function () {
        const result = await this.getProperty('tasks');
        return result || [];
    },

    getIdCounter: async function () {
        const result = await this.getProperty(dataKeyWords.ID_COUNTER_KEY);
        return result || 0;
    },

    saveAllTasks: async function (tasks)  {
        return await this.setProperties({ [dataKeyWords.TASKS_KEY]: tasks });
    },

    addTask: async function (newTask, currentTasks, refObject) {
        const normTask = await this.normalizeTask(newTask, currentTasks, refObject);
        const updatedTasks = [...currentTasks, normTask];

        if (normTask.fatherId) {
            const fatherSelection = this.selectTasksByIds([normTask.fatherId], updatedTasks);
            updatedTasks[fatherSelection.indexes[0]].childsIds.push(normTask.id);
        };

        await this.saveAllTasks(updatedTasks);
        return updatedTasks;
    },


    updateTasks: async function (ids = [], updates = [], currentTasks = []) {

        if (ids.length != updates.length) { throw Error("Should be the same amount of updates and ids to complete the action"); }

        const { indexes, tasks, error } = this.selectTasksByIds(ids, currentTasks);

        if (error) { throw Error(error.msg) };

        const newTasks = [...currentTasks];

        for (let i = 0; i <= ids.length; i++) {
            const index = indexes[i];
            newTasks[index] = { ...tasks[i], ...updates[i] };
        };

        await this.saveAllTasks(newTasks);

        return newTasks;

    },

    updateTask: async function (taskId, update, currentTasks) {
        return await this.updateTasks([taskId], [update], currentTasks);
    },

    getTaskObjById: async function (id) {
        const result = this.getAllTasks();
        const { tasks } = this.selectTasksByIds([id], result);

        if (tasks.length == 0) {
            // error msg already shown by selectTasksById function
            return null;
        };

        return tasks[0];
    },

    getNextId: async function (refObject) {
        const result = await this.getIdCounter();
        const nextId = result + 1;
        await this.setProperties({ [dataKeyWords.ID_COUNTER_KEY]: nextId });
        refObject[dataKeyWords.ID_COUNTER_KEY] = nextId;
        return result;
    },

    normalizeTask: async function (oldTask, currentTasks, refObject) {
        // validate task
        if (!(oldTask.name)) {
            console.error("Invalid task value: Does not have a name");
            return null;
        }
        // adds an generated id and the default values
        const id = await this.getNextId(refObject);
        // if the task is the first task, make it active, otherwise not
        const isActive = currentTasks.length == 0
        const defaultValues = {
            id,
            description: "",
            isActive,
            fatherId: null,
            childsIds: [],
            startDate: Date.now(),
            endDate: null,
        };
        // overwrite default values with the previus task
        const normTask = { ...defaultValues, ...oldTask };
        return normTask;
    },

    /**
    * Function: selectTasksByIds
    * 
    * Description:
    * Retrieves tasks from `currentTasks` based on an array of task IDs (`ids`). 
    * Handles cases where some IDs are not found and provides detailed feedback.
    * 
    * Parameters:
    * @param {Array} ids - Array of task IDs to search for. Defaults to [].
    * @param {Array} currentTasks - Array of task objects with `id` properties. Defaults to [].
    * 
    * Returns:
    * @returns {Selection} Result object with partial matches and error info
    * @property {Array<Task|null>} tasks - Matched tasks with `null` values for missing IDs
    * @property {Array<number|null>} indexes - Original indexes with `null` for missing IDs
    * @property {Err|false} error - Error details object if any IDs missing, `false` if all found
    */
    selectTasksByIds: function (ids = [], currentTasks = []) {

        const foundTasks = [];
        const foundTaskIndexes = [];
        const idsNotFound = [];
        let error = false;


        ids.forEach(id => {
            const index = currentTasks.findIndex((task) => task.id == id);

            if (index == -1) {
                console.error(`Task does not found with id: ${id}`);
                error = true;
                idsNotFound.push(id);

                foundTasks.push(null);
                foundTaskIndexes.push(null);
            } else {
                foundTasks.push(currentTasks[index]);
                foundTaskIndexes.push(index);
            };
        });

        if (error) {
            error = {
                msg: `The ids ${idsNotFound.join(", ")} were not found`,
                idsNotFound
            };
        };

        return {
            tasks: foundTasks,
            indexes: foundTaskIndexes,
            error
        };

    },

    selectFatherTasks: function (currentTasks = []) {
        const foundTasks = [];
        const foundTaskIndexes = [];

        currentTasks.forEach((task, index) => {
            if (task.fatherId == null) {
                foundTasks.push(currentTasks[index]);
                foundTaskIndexes.push(index);
            };
        });

        return {
            tasks: foundTasks,
            indexes: foundTaskIndexes,
        };
    },



    selectActiveFatherTasks: function (currentTasks = []) {
        const { tasks, indexes } = this.selectFatherTasks(currentTasks);

        const activeTasks = [];
        const activeIndexes = [];

        tasks.forEach((task, index) => {
            if (task.isActive) {
                activeTasks.push(task);
                // add the appropriate tasks index of this task
                activeIndexes.push(indexes[index]);
            };
        });

        return {
            tasks: activeTasks,
            indexes: activeIndexes,
        }

    },

};

