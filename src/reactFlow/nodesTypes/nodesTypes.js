

const MainNode = ({task}) => {

    

    return (
        <div>
            <p>Main Task</p>
            <h3>
                {task.name}
            </h3>
            {task.childs.lenght} childs
            <button>See Description</button>
        </div>
    )
}