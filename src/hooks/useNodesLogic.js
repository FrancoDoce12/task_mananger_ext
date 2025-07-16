import { useEffect, useMemo, useRef, useState } from "react";
import { useTasks } from "./useTasks";
import { Handle, Position, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";


const baseAnimationC = "transition-all duration-300 ease-in-out";

const mesureChildNode = (name) => {

    const padding = 10;

    // mesure with padding of 10 on each side,
    // given by the "node-base" custom tailwind class 
    const width = measureNodeWidth(name);

    const height = measureNodeHeight(1, 0, padding);

    return { width, height };

}


const mesureMainNode = () => {
    // defined mesurments
    const padding = 10;

    // height measures
    const elementHeight = 6;

    // height measurement
    const height = measureNodeHeight(3, elementHeight, padding);

    // width parameters
    const largerText = "See Description";

    // width measures
    const inlineElement = 6.89;

    const width = measureNodeWidth(largerText, padding, inlineElement);

    return { height, width };
}

const measureNodeHeight = (nLines, extraElements = 0, padding = 10) => {
    const lineHeight = 22.5;
    return (nLines * lineHeight) + extraElements + (padding * 2);
}

const measureNodeWidth = (largerText = "See Description", padding = 10, inlineElementsWidth = 0) => {
    // width measures
    const textWidth = measureTextWidth(largerText);
    return textWidth + inlineElementsWidth + (padding * 2);
}

const measureTextWidth = (text, fontFace = "600 15px sans_custom") => {

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = fontFace;
    return context.measureText(text).width;

};

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

const RootNode = ({ data }) => { };

const ChildNode = ({ data }) => {
    const task = data.task;

    return (
        <div className="flex flex-row node-base">
            <Handle type="target" id={`${task.id}-target`} position={Position.Top}></Handle>
            <h2>{task.name}</h2>
            <Handle type="source" position={Position.Bottom}></Handle>
        </div>
    )

};

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

                <Handle id={`${task.id}-child-source`} type="source" position={Position.Bottom} >
                </Handle>

            </div>
        </div>
    )
}


const useNodesLogic = () => {

    const { getChildsSelection, orderTasksByStartDate: orderTasksByDate, getFatherTask } = useTasks();

    const reactFlow = useReactFlow();

    return {
        createNodeByTask: function (task, type, position = { x: 0, y: 0 }) {
            return {
                id: `${task.id}`,
                position,
                data: { task },
                type: type
            }
        },

        createChildNode: function (task, position = { x: 0, y: 0 }) {
            return this.createNodeByTask(task, "childNode", position);
        },

        creteEdges: function (sourceTask, targetTask) {
            //source: `${sourceTask.id}-child-source`,
            //target: `${targetTask.id}-target`,
            return {
                source: `${sourceTask.id}`,
                target: `${targetTask.id}`,
                sourceHandle: `${sourceTask.id}-child-source`,
                id: (`edge-${sourceTask.id}-${targetTask.id}`),
            };
        },

        getTreeNodesAndEdges: function (fatherTask, maxLevel = 5) {
            const nodeTypes = {
                mainNode: MainNode,
                description: DescriptionNode,
                childNode: ChildNode,
            };


            // set viwe port into the center
            reactFlow.setCenter(0, 0, { duration: 0, zoom: 1 });

            const verticalPadding = 20;
            const horizontalPadding = 10;
            // measure Main Node size
            const fatherSize = mesureMainNode();

            const fatherPosition = { x: (-fatherSize.width / 2), y: (-fatherSize.height / 2) };

            const fatherNode = this.createNodeByTask(fatherTask, 'mainNode', fatherPosition);

            const childsSelection = getChildsSelection(fatherTask);
            const childTasks = orderTasksByDate(childsSelection.tasks);


            const childNodes = [];

            const nodesMeasures = childTasks.map((task) => mesureChildNode(task.name));

            // load the width of the childs to calculate the x position of each one
            const widthSum = []
            for (let i = 0; i < nodesMeasures.length; i++) {
                // the prev sum of wwidths of the last child
                let prev = 0;
                if (i != 0) { prev = widthSum[i - 1] }

                widthSum.push(nodesMeasures[i].width + prev + horizontalPadding);
            };

            const totalChildsLenght = widthSum[nodesMeasures.length - 1];

            childTasks.forEach((task, index) => {

                const widthLenght = widthSum[index];
                const x = -(widthLenght - (totalChildsLenght / 2));
                const y = (fatherSize.height / 2) + verticalPadding;
                const position = { x, y };

                childNodes.push(this.createChildNode(task, position));
            });

            const edges = [];
            childTasks.forEach((task) => {
                edges.push(this.creteEdges(fatherTask, task));
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