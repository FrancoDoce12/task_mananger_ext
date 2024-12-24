import { useState, useEffect } from "react";



const  handleClick = async (e) => {
    let quelifyUrl = chrome.runtime.getURL("editor/editor.html");

    return await chrome.tabs.create({
        "active": true,
        "url": quelifyUrl,
        "index": 999
    });
}

const Button = () => {

    return (
        <button onClick={handleClick} >
            Open Editor
        </button>)
}

export default Button