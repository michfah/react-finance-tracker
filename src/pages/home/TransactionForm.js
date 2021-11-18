import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function TransactionForm({ uid }) {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const { addDocument, response } = useFirestore('transactions');

    const handleSubmit = (e) => {
        e.preventDefault();
        addDocument({
            uid,
            name,
            amount,
            date
        });
    }

    useEffect(() => {
        if (response.success) {
            setName('');
            setAmount('');
        }
    }, [response.success])

    return (
        <>
            <h3>Add Transaction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transaction Name:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Date:</span>
                    <input
                        type="date"
                        required
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                    />
                </label>
                <label>
                    <span>Amount:</span>
                    <input
                        type="number"
                        required
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                </label>
                <button>Add Transaction</button>
            </form>
        </>
    )
}
