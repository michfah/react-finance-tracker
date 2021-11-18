import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useBudget = (collection, _query) => {

    const [budgetAmount, setBudgetAmount] = useState(null);
    const [err, setErr] = useState(null);

    // useRef prevents an infinite loop from useEffect
    const query = useRef(_query).current;

    useEffect(() => {
        // ref may be updated in future, so let rather than const
        let ref = projectFirestore.collection(collection);

        if (query) {
            // spread uid array in Home component
            ref = ref.where(...query);
        }

        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = [];
            // create a new doc for each document we have in results array
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })

            //update state
            setBudgetAmount(results);
            // clear error if one exists
            setErr(null);
        }, (err) => {
            setErr('Could not fetch data');
        })

        // unsubscribe on unmount
        return () => unsubscribe();

    }, [collection, query])

    return { budgetAmount, err }
}