import { useState } from "react";
import { useTasks } from "../../../hooks/useTasks";
import InputDetail from "../inputDetails";


const TaskDetail = ({ task }) => {

    const { updateTask, refObject } = useTasks();

    const [taskChanged, setTaskChanged] = useState({});

    const handleChange = ({ target: { name, value } }) => {
        setTaskChanged(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        updateTask(task, taskChanged);
    };

    const handleUnset = ({ target: { id } }) => {
        updateTask(task, { [id]: null });
        setTaskChanged({ ...task, [id]: null });
    };

    const handleUpdateField = ({ target: { id } }) => {
        // we use the id pof the bbutton to identify each property
        updateTask(task, { [id]: taskChanged[id] });
    };

    const completeTask = { ...task, ...taskChanged };

    return (

        <form className="form-style" onSubmit={handleSubmit}>

            <InputDetail
                handleUpdate={handleUpdateField}
                required={true}
                inputNameId="name"
                inputType="text"
                labelText="Name"
                onChange={handleChange}
                placeholder={"Make Somthing Greate!"}
                value={(completeTask.name)}
            />

            <InputDetail
                handleUpdate={handleUpdateField}
                inputNameId="description"
                inputType="text"
                labelText="Description"
                onChange={handleChange}
                placeholder={"To make Somthing Greate, we need little steps.."}
                value={(completeTask.description)}
            />

            <InputDetail
                handleUpdate={handleUpdateField}
                inputNameId="startDate"
                inputType="date"
                labelText="Start Date"
                onChange={handleChange}
                unset={true}
                onUnset={handleUnset}
                max={completeTask.endDate}
                value={completeTask.startDate}
            />

            <InputDetail
                handleUpdate={handleUpdateField}
                inputNameId="endDate"
                inputType="date"
                labelText="End Date"
                onChange={handleChange}
                unset={true}
                onUnset={handleUnset}
                min={completeTask.startDate}
                value={completeTask.endDate}
            />

            <button className="form-submit-button" type="submit">Save Changes</button>
            <button className="form-submit-button" onClick={refObject.setChildForm} >Create Child Task</button>
        </form>

    )
}

export default TaskDetail;