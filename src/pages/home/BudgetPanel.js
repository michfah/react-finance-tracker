import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

import styles from './Home.module.css';

export default function BudgetPanel({ budgets }) {

    const { user } = useAuthContext();
    // pass in 3 arguments to useCollection hook
    // third argument relates to orderBy method
    const { documents, error } = useCollection(
        'budgets',
        ["uid", "==", user.uid],
        ["createdAt", "desc"]
    );

    return (
        <>

            <div className={styles.total}>
                <span className={styles.name}>Budget:</span>
                {documents && budgets.map(() => (
                    <span>€</span>
                ))}
                {error && <p>{error}</p>}
            </div>
        </>
    )
}
