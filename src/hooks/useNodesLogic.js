import { useTasks } from "./useTasks"

const useNodesLogic = () => {

    const { getChildsSelection } = useTasks();

    return {
        createNodeByTask: function (task, position = { x: 0, y: 0 }) {
            return {
                id: `${task.id}`,
                position,
            }
        },

        creteEdges: function (sourceNode, targetNode) {
            return {
                source: sourceNode.id,
                target: targetNode.id,
                id: (`edge-${sourceNode.id}-${targetNode.id}`),
            }
        },

        getFamilyNodesAndEdges: function (foatherTask, maxLevel = 5) {
            const fatherNode = this.createNodeByTask(foatherTask, { x: 10, y: 22 });

            const childsSelection = getChildsSelection(foatherTask);

            const childNodes = [];
            childsSelection.tasks.forEach((task) => {
                childNodes.push(this.createNodeByTask(task));
            });

            const edges = [];
            childsSelection.tasks.forEach((task) => {
                edges.push(this.creteEdges(task, foatherTask));
            });

            return {
                initialNodes: [fatherNode, ...childNodes],
                initialEdges: edges
            }
        },
    }
}

export default useNodesLogic