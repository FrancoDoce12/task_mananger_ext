
const dataKeyWords = {
    TASKS_KEY: 'tasks',
    /** Map of children by parent ID */
    ID_COUNTER_KEY: 'idCounter',
    // CHILDS_BY_PARENT_ID: 'childsByParentId'
    MAIN_ALARM_KEY: 'main alarm',

    ALARM_DATA_KEY: 'alarmIsSet'
}

const REF_OBJECT_KEYS = {

    ACTIVE_TASKS: "activeTasksSelection",
    ID_COUNTER: "idCounter", // is being used???? if not eliminate

    // functions for Upward communication
    // (from childs to parent states)
    SET_TASKS_DATA: "setTasks",
    // state from main container logic, mananging the selected task to show (if selected)
    SET_SELECTED_TASK: "setSelectedTask",
    // set the key state of states that can take the main screen app, values used in are from the enum "viewerStates"
    SET_VIEWER_STATE: "setViewerState",

};

const NOTIFICATION_ID = "noty";

const defaultColor = "#62748e"; // (tailwind's slate-500)

const viewerStates = {
    NEW_TASK_SCREEN: "newTaskScreen",
    NEW_TASK_FORM: "newTaskForm",
    NEW_CHILD_FORM: "newChildForm",
    SCREEN_TASK: "showScreenTask",
};

const formStateKeys = {
    INITIAL_STATE: 'in progress',
    LOADING_STATE: 'loading',
    ACTION_COMPLETED_STATE: 'completed'
}

const nodesTypes = {
    MAIN_NODE_TYPE_KEY: "mainNode",
    CHILD_NODE_TYPE_KEY: "childNode",
    REF_NODE_TYPE_KEY :"fatherRefNode",
    DESCRIPTION_NODE_TYPE_KEY: "description",
}

export { dataKeyWords, viewerStates, formStateKeys, nodesTypes, NOTIFICATION_ID, defaultColor, REF_OBJECT_KEYS };