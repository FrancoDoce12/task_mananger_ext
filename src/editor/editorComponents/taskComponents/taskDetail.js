import { useState } from "react";
import { useTasks } from "../../../hooks/useTasks";


const TaskDetail = ({ task }) => {

    const { updateTask, refObject } = useTasks();

    const [taskChanged, setTaskChanged] = useState({});

    const handleValue = (value) => {
        if (value) return value;
    };

    const handleChange = ({ target: { name, value } }) => {
        setTaskChanged({ ...taskChanged, [name]: value });
    };

    const handleSubmit = () => {
        updateTask(task, taskChanged);
    };

    const handleUpdateField = ({ target: { id } }) => {
        // we use the id pof the bbutton to identify each property
        updateTask(task, { [id]: taskChanged[id] });
    };

    const completeTask = {...task, ...taskChanged};

    return (

        <form onSubmit={handleSubmit}>

            <label htmlFor="name">task Goal/Name</label>
            <input id="name" name="name" type="text" value={handleValue(completeTask.name)} placeholder="Find a job!"
                onChange={handleChange}></input>
            <button onClick={handleUpdateField} id="name">Done</button>

            <label htmlFor="description">Description</label>
            <input id="description" name="description" type="text" value={handleValue(completeTask.description)} placeholder="deliver resumes at....."
                onChange={handleChange}></input>
            <button onClick={handleUpdateField} id="description">Done</button>

            <label htmlFor="start date">Start Date</label>
            <input id="start date" name="startDate" type="date" value={handleValue(completeTask.startDate)}
                onChange={handleChange}></input>
            <button onClick={handleUpdateField} id="startDate">Done</button>

            <label htmlFor="End date">End Date</label>
            <input id="End date" name="endDate" type="date" value={handleValue(completeTask.endDate)}
                onChange={handleChange}></input>
            <button onClick={handleUpdateField} id="endDate">Done</button>

            <button type="submit">Save Changes</button>
            <button onClick={refObject.setChildForm} >Create Child Task</button>
        </form>

    )
}

export default TaskDetail;