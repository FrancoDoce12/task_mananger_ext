import React from "react";
import ReactDOM from "react-dom/client";
import EditorApp from "./editorApp";


const root = ReactDOM.createRoot(document.querySelector("#editor-root"));
root.render(
    <React.StrictMode>
        <EditorApp></EditorApp>
    </React.StrictMode>
)
