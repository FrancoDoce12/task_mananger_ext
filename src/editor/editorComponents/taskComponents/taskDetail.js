import { useEffect, useMemo, useState } from "react";
import { useTasks } from "../../../hooks/useTasks";
import InputDetail from "../inputDetails";
import { REF_OBJECT_KEYS, viewerStates } from "../../../constants/enums";
const { SET_VIEWER_STATE } = REF_OBJECT_KEYS


const TaskDetail = ({ task }) => {

    const { updateTask, refObject, deleteTask } = useTasks();

    const [taskChanged, setTaskChanged] = useState({});

    useEffect(() => {
        setTaskChanged({});
    }, [task]);

    const handleChange = ({ target: { name, value } }) => {
        setTaskChanged(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckBoxChange = ({ target: { name, checked } }) => {
        setTaskChanged(prev => ({ ...prev, [name]: checked }));
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

        <form className="form-style detail-form-style" onSubmit={handleSubmit}>

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
                inputNameId="isComplete"
                inputType="checkbox"
                labelText="Complete"
                checked={completeTask.isComplete}
                onChange={handleCheckBoxChange}
            />

            <InputDetail
                handleUpdate={handleUpdateField}
                inputNameId="color"
                inputType="color"
                labelText="Task Color"
                onChange={handleChange}
                value={completeTask.color}
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

            <div className="form-options-container">
                <button className="form-submit-button" type="submit">Save Changes</button>
                <button className="form-submit-button" type="button" onClick={() => { refObject[SET_VIEWER_STATE](viewerStates.NEW_CHILD_FORM) }} >Create Child Task</button>
                <button className="form-submit-button" type="button" onClick={() => { deleteTask(task) }} >Delete Task</button>
            </div>
        </form>

    )
}

export default TaskDetail;