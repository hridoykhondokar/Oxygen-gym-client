import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../image/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light ">
                <div className="container">
                    <a className="navbar-brand" href="#"><img src={logo} width="50px" alt="" /> Oxygen Gym</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-auto">
                            <li>
                                <p className="nav-link active" href="">
                                    <Link to="/home">Home</Link>
                                </p>
                            </li>
                            <li>
                                <p className = "nav-link active" href="">
                                    <Link to="/orders">Orders</Link>
                                </p>
                            </li>
                            <li>
                                <p className = "nav-link active" href="">
                                    <Link to="/addProduct">Admin</Link>
                                </p>
                            </li>
                            <li>
                                <p className = "nav-link active" href="">
                                    <Link to="/deals">Deals</Link>
                                </p>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <Link to="/login"><button className="btn btn-success" type="submit">Login</button></Link>
                        </form>
                    </div>
                </div>
            </nav>
        </div>

    );
};

export default Header;