import { useState, useEffect } from "react";
import { auth ,storage,db } from "../Firebase/config";

import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancled, setIsCancled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName,image) => {
    setError(null);
    setIsPending(true);
    try {
      //signup the user
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!response) {
        throw new Error("could not complite signup");
      }
      //store the pic

      const path=`pictures/${response.user.uid}/${image.name}`
      const img=await storage.ref(path).put(image);
      const imageUrl=await img.ref.getDownloadURL();

      //add display name to the user

      await response.user.updateProfile({ displayName,photoURL:imageUrl });

      // create profile documnent
      await db.collection("profile").doc(response.user.uid).set({
        online:true,
        displayName,
        photoURL:imageUrl
      })
      //dispatch login action
      dispatch({ type: "LOG_IN", payload: response.user });
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
  }, []);

  return { error, isPending, signup };
};
