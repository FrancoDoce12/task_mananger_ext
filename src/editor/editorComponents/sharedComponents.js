import { createContext } from "react"

// here we store the tasks array and in the set tasks function
// of the use state in the editor app

const TaskContext = createContext([]);


// viewer context is used for sharing functionality through brothers components
// or from childrens to father components
const FunctionalityContext = createContext({});

export { TaskContext, FunctionalityContext }