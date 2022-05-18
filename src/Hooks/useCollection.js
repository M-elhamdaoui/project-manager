import { useState,useEffect,useRef } from "react";
import { db } from "../Firebase/config";

export const useCollection = (collection,_query,_orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
 

  const query=useRef(_query).current 
  const orderBy=useRef(_orderBy).current

  useEffect(()=>{
        let ref =  db.collection(collection);
        console.log(ref)
        if(query){
            ref=ref.query(...query)
        }
        if(orderBy){
            ref=ref.orderBy(...orderBy)
        }
        const unsubscribe=ref.onSnapshot((snapshot)=>{
            let ress=[]
           
            snapshot.docs.forEach(doc=>{ 
                console.log(doc.data())
               ress.push({...doc.data(),id:doc.id})
            })
            
            setDocuments(ress)
           
            setError(null);
        },(error)=>{
            console.log(error)
            setError("could not fetch the data")
        })
        //unsubscribe
        return () => unsubscribe();
  },[collection,query,orderBy])

 
  return {documents,error}
};