
const dataKeyWords = {
    TASKS_KEY: 'tasks',
    /** Map of children by parent ID */
    ID_COUNTER_KEY: 'idCounter',
    // CHILDS_BY_PARENT_ID: 'childsByParentId'
    MAIN_ALARM_KEY: 'main alarm',

    ALARM_DATA_KEY: 'alarmIsSet'
}

const sideBarStates = {
    NORMAL: "normal",
    NEW_TASK: "new task"
};

const viewerStates = {
    SHOW_CURRENT_ACTIVE_TASK: "show current active task",
    NEW_TASK: "new task",
    TASK_FORM: "task form",
    CHILD_FORM: "child form",
    SHOW_SELECTED_TASK: "show selected task",
};

export { dataKeyWords, viewerStates, sideBarStates };