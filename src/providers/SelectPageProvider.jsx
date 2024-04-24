import React, { useState, createContext} from "react";

export const SelectPageContext = createContext();

export const SelectPageProvider = ({children}) =>{

    const [page, setPage] = useState("home")
    return (<SelectPageContext.Provider value={[page, setPage]} >{children}</SelectPageContext.Provider>)
}