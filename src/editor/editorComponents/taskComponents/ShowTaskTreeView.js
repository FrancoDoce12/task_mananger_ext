import '@xyflow/react/dist/style.css';
import '../../../tailwind.css'
import { ReactFlow, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import { useCallback } from 'react';
import useNodesLogic from '../../../hooks/useNodesLogic';


const ShowTaskTreeView = ({ task }) => {

    const nodesHook = useNodesLogic();

    const {initialEdges, initialNodes} = nodesHook.getFamilyNodesAndEdges(task);

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



export default ShowTaskTreeView


