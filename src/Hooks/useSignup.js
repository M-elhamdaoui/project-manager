import { useState, useEffect } from "react";
import { auth } from "../Firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancled, setIsCancled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
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

      //add display name to the user

      await response.user.updateProfile({ displayName });

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
