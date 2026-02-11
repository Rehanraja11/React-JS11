import React from "react";
import { useState } from "react";

const useCounter = (values = 0)=>{
    const [counter , counterHandler] =useState(values)


    const increment =()=> counterHandler(counter+1)            
    const decrement =()=> counterHandler(counter-1)            
    const reset =()=> counterHandler(values)           
    
    return{counter,increment,decrement,reset}
}

export default useCounter