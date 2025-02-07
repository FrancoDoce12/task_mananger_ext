import { ReactFlow, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import { useCallback } from 'react';

import '@xyflow/react/dist/style.css';


const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];


const ShowTaskTreeView = ({ mainTask = {}, maxLevel = 5 }) => {

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );


    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            />
        </div>
    )
}


const Node = ({ task, showChilds = false }) => {

}

const ChildTaskForm = (fatherId) => {
    const [taskData, setTaskData] = useState({});
    const [formState, setFormState] = useState(formStatesKeys.INITIAL_STATE);
    const { setViewerState, setSideBarState } = useContext(FunctionalityContext);

    const tasksHooks = useTasks();

    const handleSubmit = (e) => {
        e.preventDefault();

        const saveNewTaksData = async () => {
            await tasksHooks.addChildTask({ ...taskData, fatherId }, fatherId);
            setFormState(formStatesKeys.ACTION_COMPLETED_STATE);
            //update the father
            setViewerState("show current active task");
            setSideBarState("new task");
        }
        saveNewTaksData();

        setFormState(formStatesKeys.LOADING_STATE);
    };

    const handleChange = ({ target: { name, value } }) => {
        setTaskData({ ...taskData, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <form onSubmit={handleSubmit}>

                <label htmlFor="name">task Goal/Name</label>
                <input required id="name" name="name" type="text" placeholder="Find a job!"
                    onChange={handleChange}></input>

                <label htmlFor="description">Description</label>
                <input id="description" name="description" type="text" placeholder="deliver resumes at....."
                    onChange={handleChange}></input>

                <label htmlFor="start date">Start Date</label>
                <input id="start date" name="startDate" type="date"
                    onChange={handleChange}></input>

                <label htmlFor="End date">End Date</label>
                <input id="End date" name="endDate" type="date"
                    onChange={handleChange}></input>

                <button type="submit">Done</button>

            </form>
            )
        </form>
    );
};

export default ShowTaskTreeView


