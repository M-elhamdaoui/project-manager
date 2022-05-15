import { auth, db } from "../Firebase/config";
import { useAuthContext } from "./useAuthContext";
import { useEffect, useState } from "react";

export const useLogout = () => {
  const [isCancled, setIsCancled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch,user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);
    try {
      // setting the login to false
      const {uid}=user;
      await db.collection("profile").doc(uid).update({online:false})
      await auth.signOut();
      dispatch({ type: "LOG_OUT" });
      if (!isCancled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancled(true);
  },[]);
  return { isPending, error, logout };
};
