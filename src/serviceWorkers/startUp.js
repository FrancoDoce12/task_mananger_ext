



chrome.runtime.onInstalled.addListener(({ reason }) => {
    console.log("start up, reason:", reason)
    if (reason === 'install') {
        console.log("install condition executed")
        chrome.storage.local.set({'tasks': []})
    }
});