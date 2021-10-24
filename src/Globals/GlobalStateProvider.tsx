import { createContext, FC, useContext, useReducer } from "react";
import React from 'react'
import { action, globalState, initialState, reducer } from "../reducer";
import { Dispatch } from "react";

interface contextInterface {
 globalstate: globalState,
 dispatch: React.Dispatch<action>;
}


export const context = createContext({}  as contextInterface);

export const GlobalStateProvider: FC = ({children}) => {
    const [globalstate, dispatch] = useReducer(reducer, initialState);
    return (
        <context.Provider value = {{globalstate, dispatch}}>
            {children}
        </context.Provider>
    )
}

