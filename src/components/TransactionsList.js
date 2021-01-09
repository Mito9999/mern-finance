import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Transaction = (props) => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>edit</Link> |{" "}
            <span
                onClick={() => {
                    props.deleteExercise(props.exercise._id);
                }}
            >
                (X)
            </span>
        </td>
    </tr>
);

const TransactionsList = () => {
    const location = useLocation();
    const [exercises, setExercises] = useState([]);

    const deleteExercise = (id) => {
        axios
            .delete("http://localhost:5000/exercises/" + id)
            .then((res) => console.log(res.data));
        setExercises((prev) => prev.filter((el) => el._id !== id));
    };

    const exerciseList = () =>
        exercises.map((cur) => (
            <Transaction
                key={cur._id}
                exercise={cur}
                deleteExercise={deleteExercise}
            />
        ));

    useEffect(() => {
        setTimeout(() => {
            axios
                .get("http://localhost:5000/exercises")
                .then((res) => setExercises(res.data))
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
                <tbody>{exerciseList()}</tbody>
            </table>
        </div>
    );
};

export default TransactionsList;
