import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {

    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    // useRef prevents an infinite loop from useEffect
    // _query and _orderBy are both arrays and are different on every function call
    const query = useRef(_query).current;
    const orderBy = useRef(_orderBy).current;

    useEffect(() => {
        // ref may be updated in future, so let rather than const
        let ref = projectFirestore.collection(collection);

        if (query) {
            // spread uid array in Home component
            ref = ref.where(...query);
        }

        if (orderBy) {
            // spread createdAt property in Home component
            ref = ref.orderBy(...orderBy);
        }

        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = [];
            // create a new doc for each document we have in results array
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })

            //update state
            setDocuments(results);
            // clear error if one exists
            setError(null);
        }, (error) => {
            console.log(error);
            setError('Could not fetch data');
        })

        // unsubscribe on unmount
        return () => unsubscribe();

    }, [collection, query, orderBy])

    return { documents, error }
}