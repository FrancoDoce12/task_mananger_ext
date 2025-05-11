import '@xyflow/react/dist/style.css';
import '../../../tailwind.css'
import { ReactFlow, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import { useCallback } from 'react';
import useNodesLogic from '../../../hooks/useNodesLogic';


const ShowTaskTreeView = ({ task }) => {

    const nodesHook = useNodesLogic();

    const { initialEdges, initialNodes, nodeTypes } = nodesHook.getFamilyNodesAndEdges(task);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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


