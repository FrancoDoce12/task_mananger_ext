import '@xyflow/react/dist/style.css';
import '../../../tailwind.css'
import { ReactFlow, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import { useCallback, useContext, useMemo } from 'react';
import useNodesLogic from '../../../hooks/useNodesLogic';
import { FunctionalityContext } from '../sharedComponents';


const ShowTaskTreeView = ({ task }) => {

    const nodesHook = useNodesLogic();
    const refObject = useContext(FunctionalityContext);

    const { initialEdges, initialNodes, nodeTypes } = nodesHook.getTreeNodesAndEdges(task);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    function changeTask(task) {
        const { initialEdges, initialNodes, nodeTypes } = nodesHook.getTreeNodesAndEdges(task);
        setNodes(initialNodes);
        setEdges(initialEdges);
    };

    useMemo((() => { refObject.changeTreeViewTask = changeTask }), [nodes, edges]);

    useMemo((() => { refObject.showTaskTreeViewInitialaized = true; }), []);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );


    return (
        <div style={{ width: '100%', height: '100%' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                />
        </div>
    )
}



export default ShowTaskTreeView


