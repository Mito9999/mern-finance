import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import TransactionsList from "./components/TransactionsList";
import EditTransaction from "./components/EditTransaction";
import CreateTransaction from "./components/CreateTransaction";
import CreateUser from "./components/CreateUser";

function App() {
    return (
        <Router>
            <div className="container">
                <Navbar />
                <br />
                <Switch>
                    <Route exact path="/">
                        <TransactionsList />
                    </Route>
                    <Route path="/edit/:id">
                        <EditTransaction />
                    </Route>
                    <Route path="/create">
                        <CreateTransaction />
                    </Route>
                    <Route path="/user">
                        <CreateUser />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
