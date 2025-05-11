import { useEffect, useMemo, useRef, useState } from "react";
import { useTasks } from "./useTasks";
import { Handle, Position, useReactFlow } from "@xyflow/react";


const baseAnimationC = "transition-all duration-300 ease-in-out";


const DescriptionNode = ({ data: { task, bounds }, }) => {

    const [anState, setAnState] = useState("spawn");
    const reactFlow = useReactFlow();

    const sizeClases = `max-h-[15rem] max-w-[14rem]`;

    let animClases;

    switch (anState) {
        case "spawn":
            animClases = "opacity-20";
            break;
        case "normal":
            animClases = "opacity-100";
            break;
        case "despawn":
            animClases = "opacity-0";
            break;
        default:
            animClases = "opacity-100";
            break;
    }

    // init the animation when the component node spawns
    useEffect(() => {
        setAnState("normal");
    }, []);

    const handleDeletion = () => {
        setAnState("despawn");
        setTimeout(() => {
            reactFlow.deleteElements({ nodes: [{ id: `${task.id}-description` }] });
        }, 300);
    };


    return (
        <>
            <div className={`${sizeClases} node-base transition-all duration-300 ease-in-out text-pretty overflow-hidden text-ellipsis ${animClases}`}>
                {task?.description && task.description}
            </div>
            <button onClick={handleDeletion}>
                delete description--
            </button>
        </>
    )
}

const MainNode = ({ data }) => {

    const reactFlow = useReactFlow();

    const [showDescription, setShowDescription] = useState(false);
    const task = data.task;

    const bounds = reactFlow.getNodesBounds([`${task.id}`]);

    const handleAddDescription = () => {
        reactFlow.addNodes([{
            id: `${task.id}-description`,
            position: { x: bounds.x + bounds.width, y: bounds.y },
            type: "description",
            data: { ...data, bounds }
        }]);
    };


    return (
        <div
            className={`flex flex-row node-base`}
        >
            <div className="flex flex-col items-center w-fit">
                <p>Main Task</p>
                <h3>
                    {task.name}
                </h3>
                <button onClick={handleAddDescription}>See Description<Handle id={`${task.id}-d-source`} type="source" position={Position.Button} style={
                    {
                        background: "blue",
                        position: "static",
                        display: "inline-block",
                        transform: "none"
                        //top: "1rem",
                        //right: "20%",
                    }
                } /></button>
                <Handle id={`${task.id}-d-source`} type="source" position={Position.Button} style={
                    {
                        background: "blue",
                        position: "static",
                        display: "inline",
                        
                        //right: "20%",
                    }
                } />

            </div>
        </div>
    )
}


const useNodesLogic = () => {

    const { getChildsSelection } = useTasks();

    return {
        createNodeByTask: function (task, type, position = { x: 0, y: 0 }) {
            return {
                id: `${task.id}`,
                position,
                data: { task },
                type: type
            }
        },

        creteEdges: function (sourceNode, targetNode) {
            return {
                source: sourceNode.id,
                target: targetNode.id,
                id: (`edge-${sourceNode.id}-${targetNode.id}`),
            }
        },

        getFamilyNodesAndEdges: function (fatherTask, maxLevel = 5) {
            const nodeTypes = {
                mainNode: MainNode,
                description: DescriptionNode
            }
            const fatherNode = this.createNodeByTask(fatherTask, 'mainNode', { x: 10, y: 22 });

            const childsSelection = getChildsSelection(fatherTask);

            const childNodes = [];
            childsSelection.tasks.forEach((task) => {
                childNodes.push(this.createNodeByTask(task));
            });

            const edges = [];
            childsSelection.tasks.forEach((task) => {
                edges.push(this.creteEdges(task, fatherTask));
            });

            return {
                initialNodes: [fatherNode, ...childNodes],
                initialEdges: edges,
                nodeTypes,
            }
        },
    }
}

export default useNodesLogic