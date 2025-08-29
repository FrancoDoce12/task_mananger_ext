import { useState, useEffect } from "react";



const  handleClick = async (e) => {
    let quelifyUrl = chrome.runtime.getURL("editor/editor.html");

    return await chrome.tabs.create({
        "active": true,
        "url": quelifyUrl,
        "index": 999
    });
}

const ActionButton = () => {

    return (
        <button onClick={handleClick} >
            Open Task Manager Editor
        </button>)
}

export default ActionButton;