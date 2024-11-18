import React from "react";
import ReactDOM from "react-dom/client";
import ViewerContainer from "./viewContainer/vewContainer";


const root = ReactDOM.createRoot(document.querySelector("#editor-root"));
root.render(
    <React.StrictMode>
        <ViewerContainer></ViewerContainer>
    </React.StrictMode>
)
