import alarmServices from "./alarmServices";
import { TaskService } from "./taskServices";

chrome.runtime.onInstalled.addListener(({ reason }) => {
    console.log("start up, reason:", reason)
    if (reason === 'install') {
        console.log("install condition executed")
        chrome.storage.local.set({ [dataKeyWords.TASKS_KEY]: [] })
        chrome.storage.local.set({ [dataKeyWords.ID_COUNTER_KEY]: 0 })
    } else {
        alarmServices.checkCompleteAlarm();
    }
});