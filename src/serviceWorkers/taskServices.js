
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
     * @property {boolean} isComplete - Indicates whether the task is marked as complete.
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

/**
 * @typedef {Object} SelectionFatherMap
 * @property {Array<Task|null>} tasks - The array of each tasks obj selected.
 * @property {Array<number|null>} indexes Original array positions of the matched tasks,
 *                              preserving referential integrity to the source collection.
 *                              Enables direct index-based operations on the parent tasks array.
 * @property {SelectionError|false} err - The error object if the selection get any error selecting items
 * @property {Map<Number, Array<Number>>} fatherMap - A father id as key and the childs ids that are connected to this father
 */

/**
 * @typedef {Object} UpdatesPayload 
 * @property {Array<number>} ids - Ids of each task to update.
 * @property {Array<Object>} updates - the update objects corresponding to each task.
 */

//fatherMap
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

    saveAllTasks: async function (tasks) {
        return await this.setProperties({ [dataKeyWords.TASKS_KEY]: tasks });
    },

    addTask: async function (newTask, currentTasks, refObject) {
        const normTask = await this.normalizeTask(newTask, currentTasks, refObject);
        const updatedTasks = [...currentTasks, normTask];

        if (!((normTask.fatherId === null) || (normTask.fatherId === undefined))) {
            const fatherSelection = this.selectTasksByIds([normTask.fatherId], updatedTasks);
            updatedTasks[fatherSelection.indexes[0]].childsIds.push(normTask.id);
        };

        await this.saveAllTasks(updatedTasks);
        return updatedTasks;
    },

    /**
     * @returns {Promise<Array<Task>>} The new updated tasks
     */

    updateTasks: async function (ids = [], updates = [], currentTasks = []) {

        if (ids.length != updates.length) { throw Error("Should be the same amount of updates and ids to complete the action"); }

        const { indexes, tasks, error } = this.selectTasksByIds(ids, currentTasks);

        if (error) { throw Error(error.msg) };

        const newTasks = [...currentTasks];

        for (let i = 0; i < ids.length; i++) {
            const index = indexes[i];
            newTasks[index] = { ...tasks[i], ...updates[i] };
        };

        await this.saveAllTasks(newTasks);

        return newTasks;
    },

    updateTask: async function (taskId, update, currentTasks) {
        const validUpdate = this.validateTaskUpdate(update);
        return await this.updateTasks([taskId], [validUpdate], currentTasks);
    },



    /**
     * 
     * @param {UpdatesPayload} updatesPayload the object containing a list of ids, and a list of updates corresponding to each task
     * @param {Array<Task>} currentTasks The current loaded tasks
     * @returns {Promise<Array<Task>>} Returns the new updated tasks
     */
    validateAndUpdateTasks: async function (updatesPayload, currentTasks) {
        let validUpdates = this.validateTaskUpdates(updatesPayload.updates);

        return await this.updateTasks(updatesPayload.ids, validUpdates, currentTasks);

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

    getTaskById: function (id, currentTasks) {
        const selection = this.selectTasksByIds([id], currentTasks);
        if (!(selection.err)) {
            return selection.tasks[0];
        };
        return selection.err;
    },

    getNextId: async function (refObject) {
        const result = await this.getIdCounter();
        const nextId = result + 1;
        await this.setProperties({ [dataKeyWords.ID_COUNTER_KEY]: nextId });
        refObject[dataKeyWords.ID_COUNTER_KEY] = nextId;
        return result;
    },

    validateTaskUpdate: function (update) {
        // Prevent updating 'name' if it's empty or undefined
        if (!update.name) {
            delete update.name;
        };
        // Cannot update the task id
        if (update.id) {
            delete update.id;
        };
        return update;
    },

    validateTaskUpdates: function (updates) {
        return (updates.map(update => this.validateTaskUpdate(update)));
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
        const isActive = currentTasks.length == 0;
        const creationDate = new Date(Date.now()).toISOString().split("T")[0];
        const defaultValues = {
            id,
            description: "",
            isActive,
            fatherId: null,
            childsIds: [],
            isComplete: false,
            creationDate,
            startDate: creationDate,
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
    * @property {SelectionError|false} err - Error details object if any IDs missing, `false` if all found
    */
    selectTasksByIds: function (ids = [], currentTasks = []) {

        const foundTasks = [];
        const foundTaskIndexes = [];
        const idsNotFound = [];
        let err = false;


        ids.forEach(id => {
            const index = currentTasks.findIndex((task) => task.id == id);

            if (index == -1) {
                console.error(`Task does not found with id: ${id}`);
                err = true;
                idsNotFound.push(id);

                foundTasks.push(null);
                foundTaskIndexes.push(null);
            } else {
                foundTasks.push(currentTasks[index]);
                foundTaskIndexes.push(index);
            };
        });

        if (err) {
            err = {
                msg: `The ids ${idsNotFound.join(", ")} were not found`,
                idsNotFound
            };
        };

        return {
            tasks: foundTasks,
            indexes: foundTaskIndexes,
            err
        };

    },

    selectMainTasks: function (currentTasks = []) {
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
            err: false
        };
    },



    selectActiveMainTasks: function (currentTasks = []) {
        const { tasks, indexes } = this.selectMainTasks(currentTasks);

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
            err: false
        }

    },

    areActiveMainTasks: function (currentTasks) {
        return Boolean(this.selectActiveMainTasks(currentTasks).tasks[0])
    },

    /**
    * Function: uniteSelection
    * 
    * Description:
    * Merges selections by adding indexes and tasks from SelectionB into SelectionA. 
    * Modifies SelectionA (does not return a new selection).
    * 
    * Parameters:
    * @param {Selection} selectionA - Selection to be modified 
    * @param {Selection} selectionB - Selection to copy from (remains unmodified)
    * 
    */
    uniteSelection: function (selectionA, selectionB) {
        const indexes = [...(selectionA.indexes ?? [])];
        const tasks = [...(selectionA.tasks ?? [])];

        for (const [i, taskIndex] of selectionB.indexes.entries()) {
            const task = selectionB.tasks[i];

            if (taskIndex === null || task === null) continue;

            if (indexes.includes(taskIndex)) continue;

            indexes.push(taskIndex);
            tasks.push(task);
        };

        return { indexes, tasks, err: false };
    },

    selectChildsFromTasks: function (task, currentTasks) {
        return this.selectTasksByIds(task.childsIds, currentTasks);
    },

    selectChildsFromSelection: function (fatherSelection, currentTasks) {
        let childsIds = fatherSelection.tasks.flatMap(task => task.childsIds);
        return this.selectTasksByIds(childsIds, currentTasks);
    },

    selectFatherTask: function (task, currentTasks) {
        return this.selectTasksByIds([task.fatherId], currentTasks);
    },

    /**
     * retunrs a selection of the fathers, and a map of the conections with the childs keys
     * @param {Selection} childsSelection - The selection of childs
     * @param {Array<Task>} currentTasks Current loaded tasks
     * @returns {SelectionFatherMap}
     */
    selectFathersFromSelection: function (childsSelection, currentTasks) {

        let fatherMap = new Map();

        for (let i = 0; i < childsSelection.tasks.length; i++) {
            let task = childsSelection.tasks[i];
            if (fatherMap.has(task.fatherId)) {
                fatherMap.get(task.fatherId).push(task.id);
            } else {
                fatherMap.set(task.fatherId, [task.id]);
            };
        };

        fatherMap.delete(null);

        let fatherIds = [...fatherMap.keys()];

        let fatherSelection = this.selectTasksByIds(fatherIds, currentTasks);
        fatherSelection.fatherMap = fatherMap;

        return fatherSelection;
    },

    // select task childs with their childs, exept own tasks 
    deepSelectChilds: function (task, currentTasks, levelSearch = 5) {

        let childSelection = this.selectChildsFromTasks(task);

        let completeSelection = this.getNewSelection();

        for (let i = 0; i < levelSearch; i++) {
            let newLevelSelection = this.selectChildsFromSelection(childSelection, currentTasks);

            childSelection = newLevelSelection;

            completeSelection = this.uniteSelection(completeSelection, newLevelSelection);
        };

        return completeSelection;
    },

    deepSelectChildsFromSelection: function (selection, currentTasks, levelSearch = 5) {

        let tasks = selection.tasks;

        let completeSelection = this.getNewSelection(); // empty selection

        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i];

            let childsSelection = this.deepSelectChilds(task, currentTasks, levelSearch);

            completeSelection = this.uniteSelection(completeSelection, childsSelection);
        };

        return completeSelection;
    },

    // selects the complete task childs and own task
    selectCompleteTasksByIds: function (ids, currentTasks) {

        // takes the tasks
        const commonSelection = this.selectTasksByIds(ids, currentTasks);
        const tasks = commonSelection.tasks;

        // starts with an empty selection
        let completeSelection = this.getNewSelection();

        // selects all the tasks and their childs task too
        tasks.forEach((task => {
            const newSelection = this.deepSelectChilds(task, currentTasks);
            completeSelection = this.uniteSelection(completeSelection, newSelection);
        }));

        return this.uniteSelection(commonSelection, completeSelection);
    },

    deleteSelection: async function (selection, currentTasks) {

        const newTasks = [];
        // create a new list without the elements of the selection
        for (let i = 0; i < currentTasks.length; i++) {
            // if the index is not included in the selection list
            if (!(selection.indexes.includes(i))) {
                // add it to a the new list
                newTasks.push(currentTasks[i]);
            };
        };

        // update the tasks list on chrome storage system
        await this.saveAllTasks(newTasks);

        // return the new tasks list
        return newTasks;
    },

    deleteTasks: async function (ids, currentTasks) {

        // selects all childs and tasks and delete them all
        let tasksSelection = this.selectTasksByIds(ids, currentTasks);

        if (tasksSelection.err) {
            this.printSelectionError(tasksSelection.err);
            tasksSelection = this.cleanSelectionError(tasksSelection);
        };

        let childsSelection = this.deepSelectChildsFromSelection(tasksSelection, currentTasks);

        let fatherSelection = this.selectFathersFromSelection(tasksSelection, currentTasks);
        let fatherUpdets = [];
        let fatherIds = [];

        for (let i = 0; i < fatherSelection.tasks.length; i++) {
            let faherTask = fatherSelection.tasks[i];
            let fatherChildIds = faherTask.childsIds;
            let childsToEliminate = fatherSelection.fatherMap.get(faherTask.id);
            let newChildIds = fatherChildIds.filter(childIds => !childsToEliminate.includes(childIds));

            fatherUpdets.push({ childsIds: newChildIds });
            fatherIds.push(faherTask.id);
        };

        let updatePayload = this.getNewUpdatePayload(fatherIds, fatherUpdets);
        currentTasks = await this.validateAndUpdateTasks(updatePayload, currentTasks);

        let unitedDeleteSelection = this.uniteSelection(tasksSelection, childsSelection);
        let finalTasks = await this.deleteSelection(unitedDeleteSelection, currentTasks);
        return finalTasks;
    },

    getFirstNotCompleteChild: function (task, tasks, levelSearch = 5) {
        // level search is how dawn the astk tree should go searching

        let prevNotCompleteTask;

        // first child ids
        let childsIds = task.childsIds;
        // first loop, sear for each level
        for (let i = 0; i < levelSearch; i++) {
            let childsSelection = this.selectTasksByIds(childsIds, tasks);
            let levelChildsTasks = childsSelection.tasks;

            // search in order of start date (ascending)
            let orderLevelchilds = this.orderTasksByStartDate(levelChildsTasks);

            let firstNotCompletedTask = orderLevelchilds.find((task) => {
                return !(task.isComplete);
            });

            if (firstNotCompletedTask === undefined) {
                return prevNotCompleteTask;
            } else {
                childsIds = firstNotCompletedTask.childsIds;
                prevNotCompleteTask = firstNotCompletedTask;
            };
        };
        // if the loop ends and does not find the buttom of the tree, we goona return 
        // the last not completed tasks funded
        return prevNotCompleteTask;
        // this could return undefeined if the task does not have childs
    },

    getTaskMassage: function async(task, currentTasks) {

        // level of deep search along the tree
        let taskMassage = task.description;

        let lastNotCompletedChild = this.getFirstNotCompleteChild(task, currentTasks);

        if (lastNotCompletedChild) {
            taskMassage = (
                `Current working on: ${lastNotCompletedChild.name}\n${lastNotCompletedChild.description}`
            );
        };

        return taskMassage;

    },

    /**
     * Returns a new selection, if no parameters were put, returns an empty selection
     * @returns {Selection}
     */
    getNewSelection: function (tasks = [], indexes = [], err = false) {
        return {
            tasks,
            indexes,
            err
        };
    },

    /**
     * 
     * @param {Array<number>} ids List of ids, 
     * @param {Array<Object>} updates List of update
     * @returns {UpdatesPayload} - Updates payload of tasks
     */

    getNewUpdatePayload: function (ids = [], updates = []) {
        return {
            ids,
            updates
        };
    },

    cleanSelectionError: function (selection) {

        let newSelection = this.getNewSelection();

        for (let i = 0; i < selection.tasks.length; i++) {
            let task = selection.tasks[i];
            let index = selection.indexes[i];

            if (!(task)) {
                continue;
            };

            newSelection.tasks.push(task);
            newSelection.indexes.push(index);
        };

        return newSelection;
    },

    printSelectionError: function (selectionError) {
        console.error(selectionError.msg);
    },

    orderTasksByStartDate: function (tasks) {
        const taskSorted = [...tasks];

        taskSorted.sort((a, b) => {
            const aDate = new Date(a.startDate);
            const bDate = new Date(b.startDate);
            return (aDate - bDate);
        });
        return taskSorted;
    },
};

