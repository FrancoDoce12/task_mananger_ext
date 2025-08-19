import { dataKeyWords } from "../constants/enums"
import { TaskService } from "./taskServices"

const alarmServices = {

    setAlarm: async function () {
        await chrome.alarms.create(dataKeyWords.MAIN_ALARM_KEY, {
            // each 12 houres
            periodInMinutes: 60 * 6,
            delayInMinutes: 1 / 60 // test
        });
    },

    clearAlarm: async function () {
        await chrome.alarms.clear(dataKeyWords.MAIN_ALARM_KEY);
    },

    fetchAlarmData: async function () {
        let result = await chrome.storage.local.get(dataKeyWords.MAIN_ALARM_KEY) || false;
        result = result[dataKeyWords.MAIN_ALARM_KEY] || false;
        return result;
    },

    changeAlarm: async function (areActiveMainTasks, refObject) {
        if (areActiveMainTasks) {
            await this.setAlarm();
        } else {
            await this.clearAlarm();
        };
        refObject[dataKeyWords.ALARM_DATA_KEY] = areActiveMainTasks;
    },

    alarmNeedChange: function (areActiveMainTasks, refObject) {
        return (areActiveMainTasks != refObject[dataKeyWords.ALARM_DATA_KEY]);
    },

    checkCompleteAlarm: async function () {
        let tasks = await TaskService.retrieveAllTasksData();
        let refObject = { [dataKeyWords.ALARM_DATA_KEY]: await this.fetchAlarmData() };

        this.checkAlarm(refObject, tasks);
    },

    checkAlarm: function (refObject, tasks) {
        let areActiveMainTasks = TaskService.areActiveMainTasks(tasks);
        let alarmNeedChange = this.alarmNeedChange(areActiveMainTasks, refObject);
        if (alarmNeedChange) {
            this.changeAlarm(areActiveMainTasks, refObject);
        };
    },

}

export default alarmServices;