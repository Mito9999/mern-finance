import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useHistory } from "react-router-dom";

const EditExercise = (props) => {
    const routerParams = useParams();
    let history = useHistory();

    const [state, setState] = useState({
        username: "",
        description: "",
        duration: 0,
        date: new Date(),
        users: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setState((prev) => ({
            ...prev,
            date,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const exercise = {
            username: state.username,
            description: state.description,
            duration: state.duration,
            date: state.date,
        };

        console.log(exercise);

        axios
            .post(
                "http://localhost:5000/exercises/update/" + routerParams.id,
                exercise
            )
            .then((res) => console.log(res.data));

        history.push("/");
    };

    useEffect(() => {
        axios
            .get("http://localhost:5000/exercises/" + routerParams.id)
            .then((res) => {
                if (res.data.length > 0) {
                    setState((prev) => ({
                        ...prev,
                        username: res.data.username,
                        description: res.data.description,
                        duration: res.data.duration,
                        date: new Date(res.data.date),
                    }));
                }
            })
            .catch((err) => console.error(err));

        axios.get("http://localhost:5000/users/").then((res) => {
            if (res.data.length > 0) {
                setState((prev) => ({
                    ...prev,
                    users: res.data.map((user) => user.username),
                }));
            }
        });
    }, []);

    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select
                        name="username"
                        required
                        className="form-control"
                        value={state.username}
                        onChange={handleChange}
                    >
                        {state.users.map(function (user) {
                            return (
                                <option key={user} value={user}>
                                    {user}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input
                        name="description"
                        type="text"
                        required
                        className="form-control"
                        value={state.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        name="duration"
                        type="number"
                        className="form-control"
                        value={state.duration}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            name="date"
                            selected={state.date}
                            onChange={handleDateChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        value="Edit Exercise Log"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
};

export default EditExercise;
