import { dataKeyWords } from "../constants/enums";
import alarmServices from "./alarmServices";
import notyServices from "./notyServices";

// ------------- START UP PART -------------

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

// ------------ NOTIFICATIONS PART ------------

chrome.alarms.onAlarm.addListener(
    async (alarm) => {
        // run the main notification
        await notyServices.pushMainNotification();
    }
);
