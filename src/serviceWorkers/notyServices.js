import { TaskService } from "./taskServices";
import { NOTIFICATION_ID } from "../constants/enums";

const notyServices = {

    pushMainNotification: async function () {
        let imgUrl = chrome.runtime.getURL("logo_app.png");
        let tasks = await TaskService.getAllTasks();
        let activeTasks = TaskService.selectActiveMainTasks(tasks).tasks;

        await this.pushNotyfications(activeTasks, imgUrl, tasks, {});
    },

    pushNotyfications: async function (activeTasks, imgUrl, tasks, settings) {
    
        let items = activeTasks.map((task) => {
            let taskMassage = TaskService.getTaskMassage(task, tasks);
            return { title: task.name, message: taskMassage };
        })

        switch (items.length) {
            // not shure abaut the case 0
            case 0:
                await alarmServices.checkCompleteAlarm(); // is it right? it depends on the alarm,
                break;
            case 1:
                await this.pushNotyOneTask(items[0], imgUrl, settings);
                break;
            default:
                await this.pushNotyItems(items, imgUrl, settings)
                break;
        }
    },

    pushNotyItems: async function (items, iconUrl, settings) {

        items.forEach((item, index) => {
            item.title = `Task ${index + 1}: ${item.title}`;
        });

        await chrome.notifications.create(
            NOTIFICATION_ID,
            {
                iconUrl,
                title: "Have work to do;",
                message: "",
                items,
                contextMessage: "Tasks Reminder",
                type: "list",
                silent: false,
                priority: 2,
            }
        )
    },

    pushNotyOneTask: async function (item, iconUrl, settings) {
        let title = "Task to do: " + item.title;
        let message = item.message;

        await chrome.notifications.create(
            NOTIFICATION_ID,
            {
                title,
                message,
                iconUrl,
                type: "basic",
                contextMessage: "Tasks Reminder",
                silent: false,
                priority: 2,
            }
        )
    },

};

export default notyServices;