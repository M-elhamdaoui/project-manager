import { useState,useEffect } from "react";
import { auth, db } from "../Firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin=()=>{
    const {dispatch}=useAuthContext()
    const [isCancled,setIsCancled]=useState(false)
    const [error,setError]=useState(null)
    const [isPending,setIsPending]=useState(false)


    const login= async (email,password)=>{
        setError(null)
        setIsPending(true)
        try {
                const res =await auth.signInWithEmailAndPassword(email,password)
                dispatch({ type: "LOG_IN", payload: res.user });
                db.collection("profile").doc(res.user.uid).update({online:true})
                if(!isCancled){
                    setIsPending(false)
                    setError(null);
                }
        } catch (err) {
            if(!isCancled){
                console.log(err.message)
                setError(err.message);
                setIsPending(false);
            }
        }
    
    }

    useEffect(()=>{

        return ()=>setIsCancled(true)
    },[])


    return {isPending,error,login}
}