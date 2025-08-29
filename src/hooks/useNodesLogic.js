import { useEffect, useMemo, useRef, useState } from "react";
import { useTasks } from "./useTasks";
import { Handle, Position, useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";
import { nodesTypes, defaultColor } from "../constants/enums";
const { CHILD_NODE_TYPE_KEY, DESCRIPTION_NODE_TYPE_KEY, MAIN_NODE_TYPE_KEY, REF_NODE_TYPE_KEY } = nodesTypes


const baseAnimationC = "transition-all duration-300 ease-in-out";


// --------------------- Measure sizes functions ---------------------

const mesureChildNode = (name) => {

    const padding = 10;

    // mesure with padding of 10 on each side,
    // given by the "node-base" custom tailwind class 
    const width = measureNodeWidth(name);

    const height = measureNodeHeight(1, 0, padding);

    return { width, height };

}

const mesureFatherRefNode = (fatherTask) => {
    // defined mesurments
    const padding = 10;

    // height measures
    const microTextHeight = (1.25 / 0.875);

    // mesurments
    const height = measureNodeHeight(2, microTextHeight, padding);
    const width = measureNodeWidth(fatherTask.name, padding);

    return { height, width };
};

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

const measureNodeHeight = (nLines, extraElementsHeight = 0, padding = 10) => {
    const lineHeight = 22.5;
    return (nLines * lineHeight) + extraElementsHeight + (padding * 2);
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

// --------------------- Nodes Definitions ---------------------

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
            <div style={{ "borderColor": `${task.color || defaultColor}` }}
                className={`${sizeClases} node-base transition-all duration-300 ease-in-out text-pretty overflow-hidden text-ellipsis ${animClases}`}>
                {task?.description && task.description}
            </div>
            <button onClick={handleDeletion}>
                delete description--
            </button>
        </>
    )
}

const FatherRefNode = ({ data }) => {

    const { setSelectedTask } = useTasks();

    const task = data.task;

    return (
        <div onClick={() => setSelectedTask(task)}
            className="flex flex-row node-base secundary-node"
            style={{ "borderColor": `${task.color || defaultColor}` }}>
            <h2 className="ref-text" >{task.name}</h2>
            <p className="ref-text suspensive-dots">...</p>
            <Handle type="target" position={Position.Bottom}></Handle>
        </div>
    )
};

const ChildNode = ({ data }) => {

    const { setSelectedTask } = useTasks();

    const task = data.task;

    task.color = task?.color ? task.color : "#62748e"; // slate-500 color as default

    return (
        <div onClick={() => setSelectedTask(task)}
            className="flex flex-row node-base"
            style={{ "borderColor": `${task.color || defaultColor}` }}>
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

    task.color = task?.color ? task.color : "#62748e"; // slate-500 color as default

    return (
        <div
            className={`flex flex-row node-base`}
            style={{ "borderColor": `${task.color || defaultColor}` }}>
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

                <Handle id={`${task.id}-ref-source`} type="source" position={Position.Top} >
                </Handle>

            </div>
        </div>
    )
}


// --------------------- Nodes hook definition ---------------------


const useNodesLogic = () => {

    const { getChildsFromTask, orderTasksByStartDate, getFatherTask, isValidTaskId } = useTasks();

    const reactFlow = useReactFlow();

    return {
        createNodeByTask: function (task, type, position = null) {
            if (position === null) { position = { x: 0, y: 0 }; };
            return {
                id: `${task.id}`,
                position,
                data: { task },
                type: type
            };
        },

        createChildNode: function (task, position = { x: 0, y: 0 }) {
            return this.createNodeByTask(task, "childNode", position);
        },

        createFatherRefNode: function (fatherTask, position = { x: 0, y: 0 }) {
            return this.createNodeByTask(fatherTask, "fatherRefNode", position);
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

        createRefNodeEdge: function (mainTask, refTask) {
            return {
                source: `${mainTask.id}`,
                target: `${refTask.id}`,
                sourceHandle: `${mainTask.id}-ref-source`,
                id: (`edge-${mainTask.id}-${refTask.id}`),
            };
        },

        /**
         * 
         * @description Create the nodes's stucture and mesurments to show on react flow view port
         * 
         * @param {Task} focusTask 
         * @param {Number} maxLevel unused param
         * @returns 
         */
        centerCamera: function () {
            // set viwe port into the center
            reactFlow.setCenter(0, 0, { duration: 0, zoom: 1 });
        },

        getNodesTypes: function () {
            return {
                [MAIN_NODE_TYPE_KEY]: MainNode,
                [DESCRIPTION_NODE_TYPE_KEY]: DescriptionNode,
                [CHILD_NODE_TYPE_KEY]: ChildNode,
                [REF_NODE_TYPE_KEY]: FatherRefNode
            };
        },

        getTreeEdges: function (focusTask, childTasks, fatherTask = false, deepLevel = 5) {
            const edges = [];

            childTasks.forEach((task) => {
                edges.push(this.creteEdges(focusTask, task));
            });

            if (fatherTask) {
                edges.push(this.createRefNodeEdge(focusTask, fatherTask));
            };

            return edges;
        },

        getTreeEdgesByTask: function (focusTask) {
            var childTasks = getChildsFromTask(focusTask);
            var isFatherValid = isValidTaskId(focusTask.fatherId);
            return this.getTreeEdges(focusTask, childTasks, isFatherValid);
        },

        getTreeFocusNode: function (focusTask, focusNodeSize, position = null) {
            if (position === null) {
                position = { x: -(focusNodeSize.width / 2), y: -(focusNodeSize.height / 2) };
            };
            return this.createNodeByTask(focusTask, 'mainNode', position);
        },

        getTreeChildsNodes: function (childsTasks, focusNodeSize, prevPositions = [], verticalPadding = 20, horizontalPadding = 15) {
            // prevPosition should be order by start date alredy
            const orderChildTasks = orderTasksByStartDate(childsTasks);

            const childNodes = [];
            const nodesMeasures = orderChildTasks.map((task) => mesureChildNode(task.name));

            // load the width of the childs to calculate the x position of each one
            let prevWidthTotal = 0
            let positionWidths = []

            for (let i = 0; i < nodesMeasures.length; i++) {
                // the prev sum of wwidths of the last child
                let nodeTotalWith = nodesMeasures[i].width + horizontalPadding * 2;
                positionWidths.push(prevWidthTotal + (nodeTotalWith / 2));

                prevWidthTotal = prevWidthTotal + nodeTotalWith;
            };

            const totalChildsLenght = prevWidthTotal;
            const childsLineHeight = (focusNodeSize.height / 2) + verticalPadding;

            prevPositions.length = orderChildTasks.length;

            orderChildTasks.forEach((task, index) => {
                let finalPosition = {};

                if (prevPositions[index]) {
                    finalPosition = prevPositions[index];
                } else {
                    finalPosition = {
                        x: positionWidths[index] - (totalChildsLenght / 2),
                        y: childsLineHeight
                    };
                };

                childNodes.push(this.createChildNode(task, finalPosition));
            });

            return childNodes;

        },

        getTreeRefNode: function (fatherTask, focusNodeSize, position = null, fatherNodePadding = 30) {

            if (position === null) {
                const fatherRefNodeSize = mesureFatherRefNode(fatherTask);

                const y = -((focusNodeSize.height / 2) + fatherNodePadding + (fatherRefNodeSize.height / 2));
                const x = -(fatherRefNodeSize.width / 2);
                position = { x, y };
            }

            return this.createFatherRefNode(fatherTask, position);
        },

        getTreeNodes: function (focusTask, childTasks, isFatherTask, focusPos = null, childsPos = [], refPos = null) {

            var nodes = []

            const focusNodeSize = mesureMainNode();

            const focusNode = this.getTreeFocusNode(focusTask, focusNodeSize, focusPos);
            const childNodes = this.getTreeChildsNodes(childTasks, focusNodeSize, childsPos);

            nodes = [focusNode, ...childNodes];

            if (isFatherTask) {
                const refNode = this.getTreeRefNode(getFatherTask(focusTask), focusNodeSize, refPos);
                nodes = [refNode, ...nodes];
            };

            return nodes;

        },

        getTreeNodesByTask: function (focusTask, focusPos = null, childsPos = [], refPos = null) {
            var childTasks = getChildsFromTask(focusTask);
            var isFatherValid = isValidTaskId(focusTask.fatherId);

            return this.getTreeNodes(focusTask, childTasks, isFatherValid, focusPos, childsPos, refPos);
        },

        updateTreeNodes: function (task) {

            let nodes = reactFlow.getNodes();

            console.log(nodes);

            let positions = {
                [CHILD_NODE_TYPE_KEY]: []
            };
            let childs = []
            nodes.forEach((node) => {
                if (node.type === CHILD_NODE_TYPE_KEY) {
                    childs.push({ ...node.data.task, position: node.position })
                } else {
                    positions[node.type] = node.position
                };
            })

            childs = orderTasksByStartDate(childs);
            positions[CHILD_NODE_TYPE_KEY] = childs.map((child) => {
                return child.position;
            })

            return this.getTreeNodesByTask(
                task,
                positions[MAIN_NODE_TYPE_KEY],
                positions[CHILD_NODE_TYPE_KEY],
                positions[REF_NODE_TYPE_KEY]
            );
        },

        getView: function (focusTask) {
            var isFatherTask = !(focusTask.fatherId === null);
            var childTasks = getChildsFromTask(focusTask);

            var nodes = this.getTreeNodes(focusTask, childTasks, isFatherTask);

            var edges = this.getTreeEdges(focusTask, childTasks, isFatherTask);

            return {
                nodes, edges
            };

        },

        getTreeNodesAndEdges: function (focusTask, maxLevel = 5) {

            const verticalPadding = 20;
            const horizontalPadding = 15;
            // measure Main Node size
            const focusNodeSize = mesureMainNode();

            const focusPosition = { x: -(focusNodeSize.width / 2), y: -(focusNodeSize.height / 2) };

            const focusNode = this.createNodeByTask(focusTask, 'mainNode', focusPosition);

            const childsTasks = getChildsFromTask(focusTask);
            const orderChildTasks = orderTasksByStartDate(childsTasks);


            const childNodes = [];

            const nodesMeasures = orderChildTasks.map((task) => mesureChildNode(task.name));

            // load the width of the childs to calculate the x position of each one
            let prevWidthTotal = 0
            let childsPositions = []

            for (let i = 0; i < nodesMeasures.length; i++) {
                // the prev sum of wwidths of the last child
                let nodeTotalWith = nodesMeasures[i].width + horizontalPadding * 2
                childsPositions.push(prevWidthTotal + (nodeTotalWith / 2))

                //widthSum.push(nodesMeasures[i].width + prevWidthSum + horizontalPadding);
                prevWidthTotal = prevWidthTotal + nodeTotalWith;
            };

            const totalChildsLenght = prevWidthTotal;
            const childsLineHeight = (focusNodeSize.height / 2) + verticalPadding;

            orderChildTasks.forEach((task, index) => {

                const widthPosition = childsPositions[index];
                const x = widthPosition - (totalChildsLenght / 2);

                childNodes.push(this.createChildNode(task, { x, y: childsLineHeight }));
            });

            const edges = [];
            orderChildTasks.forEach((task) => {
                edges.push(this.creteEdges(focusTask, task));
            });

            // --------- adds the father node -------------
            const haveFather = !(focusTask.fatherId === null);

            if (haveFather) {
                const fatherTask = getFatherTask(focusTask);

                // mesurments
                const fatherNodePadding = 30
                const mesureFatherNode = mesureFatherRefNode(fatherTask);

                const y = -((focusNodeSize.height / 2) + fatherNodePadding + (mesureFatherNode.height / 2));
                const x = -(mesureFatherNode.width / 2);
                const fatherPosition = { x, y };

                const fatherNode = this.createFatherRefNode(fatherTask, fatherPosition);

                childNodes.push(fatherNode);
                edges.push(this.createRefNodeEdge(focusTask, fatherTask));
            };

            return {
                nodes: [focusNode, ...childNodes],
                edges: [...edges],

            }
        },
    }
}

export default useNodesLogic