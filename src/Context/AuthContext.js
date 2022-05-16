import { createContext , useReducer } from "react";
import { auth } from "../Firebase/config";
import { useEffect } from "react";

export const authReducer=(state,action)=>{
    switch(action.type){
        case "LOG_IN":
            return {...state,user:action.payload}
        case "LOG_OUT":
            return {...state,user:null}
        case "AUTH_IS_READY":
            return {...state,user:action.payload,authIsReady:true}
        default:
            return state
    }
}


export const AuthContext =createContext()

export const AuthContextProvider=({children})=>{

    const [state , dispatch]=useReducer(authReducer,{
        user:null,
        authIsReady:false
    })
    useEffect(()=>{
        const unsub=auth.onAuthStateChanged((user)=>{
            dispatch({type:"AUTH_IS_READY",payload:user})
            unsub()
        })
    },[])
console.log("authContext state",state)
    return (
        <AuthContext.Provider value={{...state,dispatch}} >
            {children}
        </AuthContext.Provider>
    )
}