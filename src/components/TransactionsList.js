import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Transaction = (props) => (
    <tr>
        <td>{props.transaction.username}</td>
        <td>{props.transaction.description}</td>
        <td>{props.transaction.duration}</td>
        <td>{props.transaction.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.transaction._id}>edit</Link> |{" "}
            <span
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => {
                    props.deleteTransaction(props.transaction._id);
                }}
            >
                (X)
            </span>
        </td>
    </tr>
);

const TransactionsList = () => {
    const location = useLocation();
    const [transactions, setTransactions] = useState([]);

    const deleteTransaction = (id) => {
        axios
            .delete("http://localhost:5000/transactions/" + id)
            .then((res) => console.log(res.data));
        setTransactions((prev) => prev.filter((el) => el._id !== id));
    };

    const transactionList = () =>
        transactions.map((cur) => (
            <Transaction
                key={cur._id}
                transaction={cur}
                deleteTransaction={deleteTransaction}
            />
        ));

    useEffect(() => {
        setTimeout(() => {
            axios
                .get("http://localhost:5000/transactions")
                .then((res) => setTransactions(res.data))
                .catch((err) => console.error(err));
        }, 50);
    }, [location]);

    return (
        <div>
            <h3>Logged Transactions</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{transactionList()}</tbody>
            </table>
        </div>
    );
};

export default TransactionsList;
