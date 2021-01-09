import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import ExercisesList from "./components/ExercisesList";
import EditExercise from "./components/EditExercise";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";

function App() {
    return (
        <Router>
            <div className="container">
                <Navbar />
                <br />
                <Route exact path="/">
                    <ExercisesList />
                </Route>
                <Route path="/edit/:id">
                    <EditExercise />
                </Route>
                <Route path="/create">
                    <CreateExercise />
                </Route>
                <Route path="/user">
                    <CreateUser />
                </Route>
            </div>
        </Router>
    );
}

export default App;
