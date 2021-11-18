import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {

    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        try {
            // signup user
            const res = await projectAuth.createUserWithEmailAndPassword(email, password);

            if (!res) {
                throw new Error('Could not complete user signup');
            }

            // add displayName to user created in res object
            await res.user.updateProfile({ displayName });

            // dispatch LOGIN action
            dispatch({ type: 'LOGIN', payload: res.user });

            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        }
        catch (err) {
            if (!isCancelled) {
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    // fire cleanup function in useEffect once
    useEffect(() => {
        return () => setIsCancelled(true);
    }, [])

    return { error, isPending, signup }
}