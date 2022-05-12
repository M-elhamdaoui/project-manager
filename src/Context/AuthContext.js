import { createContext , useReducer } from "react";

export const authReducer=(state,action)=>{
    switch(action.type){
        case "LOG_IN":
            return {...state,user:action.payload}
        case "LOG_OUT":
            return {...state,user:null}
        default:
            return state
    }
}


export const AuthContext =createContext()

export const AuthContextProvider=({children})=>{

    const [state , dispatch]=useReducer(authReducer,{
        user:null
    })
console.log("authContext state",state)
    return (
        <AuthContext.Provider value={{...state,dispatch}} >
            {children}
        </AuthContext.Provider>
    )
}