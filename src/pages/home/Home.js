import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

import styles from './Home.module.css';
import BudgetForm from './BudgetForm';
import { useBudget } from '../../hooks/useBudget';

export default function Home() {

    const { user } = useAuthContext();
    // pass in 3 arguments to useCollection hook
    // third argument relates to orderBy method
    const { documents, error } = useCollection(
        'transactions',
        ["uid", "==", user.uid],
        ["createdAt", "desc"]
    );

    const { budgetAmount } = useBudget(
        'budgets',
        ["uid", "==", user.uid],
    );

    return (
        <div className={styles.container}>
            {/* transaction list */}
            <div className={styles.content}>
                {error && <p>{error}</p>}
                {documents && <TransactionList transactions={documents} budgets={budgetAmount} />}
            </div>
            {/* add transaction form */}
            <div className={styles.sidebar}>
                <TransactionForm uid={user.uid} />
                <div className={styles.budget}>
                    <BudgetForm uid={user.uid} />
                </div>
            </div>
        </div>
    )
}
