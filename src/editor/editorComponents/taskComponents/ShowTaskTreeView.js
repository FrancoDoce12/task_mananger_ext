import '@xyflow/react/dist/style.css';
import '../../../tailwind.css'
import { ReactFlow, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import useNodesLogic from '../../../hooks/useNodesLogic';
import { useTasks } from '../../../hooks/useTasks';


const ShowTaskTreeView = ({ task }) => {

    const nodesHook = useNodesLogic();
    const nodeTypes = nodesHook.getNodesTypes();

    // keeps track of prevous task id, to control render logic more efficiently (avoid re renders)
    const [prevTaskId, setPrevTaskId] = useState(null);

    // default values
    
    const [nodes, setNodes, onNodesChange] = useNodesState((() => {
        return nodesHook.getTreeNodesByTask(task);
    }));

    const [edges, setEdges, onEdgesChange] = useEdgesState((() => {
        return nodesHook.getTreeEdgesByTask(task);
    }));


    useEffect(() => {

        if (!(task.id === prevTaskId)) {
            const { edges, nodes } = nodesHook.getTreeNodesAndEdges(task);
            setEdges(edges);
            setNodes(nodes);
            nodesHook.centerCamera();
            setPrevTaskId(task.id);
            return;
        };

        setNodes(nodesHook.updateTreeNodes(task));

    }, [task])

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



export default ShowTaskTreeView;


