import SideBar from "./sideBar";
import TaskViewer from "./taskViewer";
import { useMainContainerLogic } from "../../hooks/useMainContainerLogic";


const MainContainer = () => {
    // main container
    const { isSideBarNewTaskButton, taskViewerState, screenTask } = useMainContainerLogic();

    return (
        <div className="flex flex-row w-full h-screen">
            <SideBar isSideBarNewTaskButton={isSideBarNewTaskButton} ></SideBar>
            <TaskViewer
                state={taskViewerState}
                screenTask={screenTask}>
            </TaskViewer>
        </div>
    );
};


export default MainContainer;