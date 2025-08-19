import '@xyflow/react/dist/style.css';
import '../../../tailwind.css'
import { ReactFlow, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import useNodesLogic from '../../../hooks/useNodesLogic';
import { FunctionalityContext } from '../sharedComponents';


const ShowTaskTreeView = ({ task }) => {

    const nodesHook = useNodesLogic();
    const refObject = useContext(FunctionalityContext);

    const nodeTypes = nodesHook.getNodesTypes();

    const [nodes, setNodes, onNodesChange] = useNodesState((() => {
        return nodesHook.getTreeNodesAndEdges(task).nodes;
    }));

    const [edges, setEdges, onEdgesChange] = useEdgesState((() => {
        return nodesHook.getTreeNodesAndEdges(task).edges;
    }));

    useEffect(() => {
        const { edges, nodes } = nodesHook.getTreeNodesAndEdges(task);
        setEdges(edges);
        setNodes(nodes);

        nodesHook.centerCamera();
    }, [task])

    // if the task changes, get new task tree
    // useEffect(() => {
    //     const { newEdges, newNodes } = nodesHook.getTreeNodesAndEdges(task);
    //     setNodes(newNodes);
    //     setEdges(newEdges);
    // }, [task]);

    // function changeTask(task) {
    //     const { initialEdges, initialNodes, nodeTypes } = nodesHook.getTreeNodesAndEdges(task);
    //     setNodes(initialNodes);
    //     setEdges(initialEdges);
    // };

    //useEffect((() => { refObject.changeTreeViewTask = changeTask }), [nodes, edges]);

    //useEffect((() => { refObject.showTaskTreeViewInitialaized = true; }), []);

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


