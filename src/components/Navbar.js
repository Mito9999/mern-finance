import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
            FinancesTracker
        </Link>
        <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                    <Link to="/" className="nav-link">
                        Transactions
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/create" className="nav-link">
                        Create Transaction Log
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/user" className="nav-link">
                        Create User
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
);

export default Navbar;
