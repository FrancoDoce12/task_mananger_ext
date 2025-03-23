const IsActiveButton = ({ task, toggleTask }) => {

    if (task.isActive) {
        return (
            <button onClick={() => {toggleTask(task)}} className="text-emerald-500">
                Is Active
            </button>
        )
    } else {
        return (
            <button onClick={() => {toggleTask(task)}} className="text-gray-400">
                Is Inactive
            </button>
        )
    }
}

export default IsActiveButton