import { useReducer, useEffect, useState } from "react";
import { db, timestamp } from "../Firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

export const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { ...initialState, isPending: true };
    case "ADD_DOC":
      return { ...state, document: action.payload, success: true, error: null };
    case "DELETE":
      return { ...initialState, success: true };
    case "ERROR":
      return { ...initialState, error: action.payload, success: false };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancled, setIsCancled] = useState(false);
  const ref = db.getCollection(collection);

  const dispatchIfNotCancled = (action) => {
    if (!isCancled) {
      dispatch(action);
    }
  };

  //add documents
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDoc = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancled({ type: "ADD_DOC", payload: addedDoc });
    } catch (err) {
      dispatchIfNotCancled({ type: "ERROR", payload: err.message });
    }
  };
  //delete documents
  const deleteDoc = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await ref.doc(id).delete();
      dispatchIfNotCancled({ type: "DELETE" });
    } catch (err) {
      dispatchIfNotCancled({
        type: "ERROR",
        payload: err.message,
      });
    }
  };
  useEffect(() => {
    return () => setIsCancled(true);
  }, []);

  return { addDocument, deleteDoc, response };
};
