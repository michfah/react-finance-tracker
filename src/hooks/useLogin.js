import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {

    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);

        // log user in
        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password);

            // dispatch LOGOUT action
            dispatch({ type: 'LOGIN', payload: res.user });

            // update state
            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        }
        catch (err) {
            if (!isCancelled) {
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    // fire cleanup function in useEffect once
    useEffect(() => {
        return () => setIsCancelled(true);
    }, [])

    return { login, error, isPending }
}