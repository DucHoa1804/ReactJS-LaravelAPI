import axios from 'axios';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import '~/assets/frontend/Navbar.scss';
import logo from '~/assets/images/logo/logo.png';

const Navbar = () => {
    const history = useHistory();

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then((res) => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal('Success', res.data.message, 'success'); ///message lấy bên laravel hien len hang hinh icon
                history.push('/');
            }
        });
    };
    var AuthForm = '';
    if (!localStorage.getItem('auth_token')) {
        ///nếu như chưa đăng nhập thì (xét bằng token)
        AuthForm = (
            <ul className="dropdown-menu">
                <li>
                    <Link className="dropdown-item" to="/login">
                        Login
                    </Link>
                </li>
                <li>
                    <Link className="dropdown-item" to="/register">
                        Register
                    </Link>
                </li>
            </ul>
        );
    } else {
        AuthForm = (
            <ul className="dropdown-menu">
                <li>
                    <Link className="dropdown-item" to="#" onClick={logoutSubmit}>
                        Logout
                    </Link>
                </li>
            </ul>
        );
    }
    return (
        <section className="header clearfix">
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <div className="container">
                    <div className="logo">
                        <Link className="navbar-logo" to="/">
                            <img src={logo} alt="" width="30%" />
                        </Link>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="#">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="#">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">
                                    Link
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link"
                                    to="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Dropdown
                                </Link> 
                                 {/* Dropdown */}
                                <ul className="dropdown-menu"> 
                                    <li>
                                        <Link className="dropdown-item" to="#">
                                            Action
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="#">
                                            Another action
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="#">
                                            Something else here
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="#">
                                    Category
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar-nav navbar-right">
                        <ul className="navbar-nav icon">
                            <li className="nav-item">
                                <div className="icon">
                                    <span className="lnr lnr-magnifier" id="search">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                    <div className="search">
                                        <form className="d-flex" role="search">
                                            <input
                                                className="form-control me-1"
                                                type="search"
                                                placeholder="Search"
                                                aria-label="Search"
                                            />
                                            <button className="btn btn-search" type="submit">
                                                <i className="fa-solid fa-magnifying-glass"></i>
                                            </button>
                                        </form>
                                    </div>
                                    {/* <div className="search">
                                    <input type="text" className="input" placeholder="Search..." />
                                    <button className="btn">
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div> */}
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link to="#" className="btn btn-cart">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <span className="posistion-absolute top-0  translate-middle badge rounded-pill bg-danger ">
                                        1
                                    </span>
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link login"
                                    to="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fa-solid fa-user"></i>
                                </Link>

                                {AuthForm}
                            </li>
                            {/* <li className="nav-item">
                                <i className="fa-solid fa-user">
                                    <div className="user">
                                        <div className="auth-user" tabIndex="-1">
                                            <li className="nav-item user">
                                                <Link className="nav-link login" aria-current="page" to="/login">
                                                    Login
                                                </Link>
                                            </li>
                                            <li className="nav-item user">
                                                <Link className="nav-link register" aria-current="page" to="/register">
                                                    Register
                                                </Link>
                                            </li>
                                        </div>

                                        <span className="lnr lnr-magnifier" id="search"></span>
                                    </div>
                                </i>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        </section>
    );
};

export default Navbar;
