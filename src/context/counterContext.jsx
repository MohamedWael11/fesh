import { createContext, useState } from "react";


export let counterContext=createContext()


export default function CounterContextProvider(pros){

let [count,setCount]=useState(10);

    

    return <counterContext.Provider value={{count,setCount}}>
        {pros.children}
    </counterContext.Provider>
}