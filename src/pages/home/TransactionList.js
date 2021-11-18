import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import Moment from 'moment';

import styles from './Home.module.css';

export default function TransactionList({ transactions, budgets }) {

    const { user } = useAuthContext();
    const { deleteDocument } = useFirestore('transactions');

    // date format with moment.js
    Moment.locale('en');

    const spentAmount = transactions.map((transaction) => transaction.amount);
    const spentTotal = spentAmount.reduce((acc, item) => (acc += +item), 0).toFixed(2);

    const budgetAmount = budgets && budgets.map((budget) => budget.amount);
    const budgetTotal = budgets && budgetAmount.reduce((acc, item) => (acc += +item), 0).toFixed(2);

    const budgetSpent = ((budgetTotal - spentTotal)).toFixed(2);

    return (
        <>
            <div className={styles.total}>
                <span className={styles.name}>Budget:</span>
                <p className={styles.amount}>€{budgetTotal}</p>
            </div>
            <div className={styles.total}>
                <span className={styles.name}>Total Spent:</span>
                <p className={styles.amount}>€{spentTotal}</p>
            </div>
            <div className={styles.total}>
                <span className={styles.name}>Remaining:</span>
                {budgetSpent >= 0 &&
                    <p className={styles.amount}>
                        €{budgetSpent}
                    </p>}
                {budgetSpent < 0 &&
                    <p className={styles.amount}>
                        <span className={styles.negative}>€{budgetSpent}</span>
                    </p>}
            </div>
            <hr />
            <h3>{user.displayName}'s transactions</h3>
            <ul className={styles.transactions}>
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        <p className={styles.name}>{transaction.name}</p>
                        <p className={styles.date}>{Moment(transaction.date).format('ddd DD MMM, YY')}</p>
                        <p className={styles.amount}>€{transaction.amount}</p>
                        <button onClick={() => deleteDocument(transaction.id)}>x</button>
                    </li>
                ))}
            </ul>
        </>
    )
}
