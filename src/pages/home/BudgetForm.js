import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function BudgetForm({ uid }) {

    const [amount, setAmount] = useState('');
    const { addDocument, response } = useFirestore('budgets');

    const handleSubmit = (e) => {
        e.preventDefault();
        addDocument({
            uid,
            amount
        });
    }

    useEffect(() => {
        if (response.success) {
            setAmount('');
        }
    }, [response.success])

    return (
        <>
            <h3>Add Budget</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Amount:</span>
                    <input
                        type="number"
                        required
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                </label>
                <button>Add Budget</button>
            </form>
        </>
    )
}
