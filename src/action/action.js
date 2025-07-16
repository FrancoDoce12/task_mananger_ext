import '../tailwind.css';
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Button from "./actionButton";


const root = ReactDOM.createRoot(document.querySelector("#action-root"));


const ActionApp = () => {

    // no need to update the if if the tasks update

    return (
        <div>
            <h1>Hello Extensions sfgaf</h1>
            <Button></Button>
        </div>
    )
}


root.render(
    <React.StrictMode>
        <ActionApp>

        </ActionApp>
    </React.StrictMode>
)