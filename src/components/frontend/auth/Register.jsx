import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '~/layouts/frontend/Navbar';
import '~/assets/frontend/Register.scss';
import axios from 'axios';
import swal from 'sweetalert'; //icon success
function Register() {
    const history = useHistory();
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        gender: '',
        phone: '',
        password: '',
        error_list: [],
    });
    const [list, setList] = useState({
        showPass: false,
    }); //showpass
    const handleShowPass = () => {
        setList({
            showPass: !list.showPass,
        });
    };
    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    };
    const registerSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: registerInput.email,
            name: registerInput.name,
            gender: registerInput.gender,
            phone: registerInput.phone,
            password: registerInput.password,
        };
        axios.get('/sanctum/csrf-cookie').then((response) => {
            axios.post(`/api/register`, data).then((res) => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal('Success', res.data.message, 'success'); ///message lấy bên laravel hien len hang hinh icon
                    history.push('/'); ///toi trang hom
                } else {
                    setRegister({ ...registerInput, error_list: res.data.validation_errors });
                }
            });
        });
    };

    return (
        <div>
            <Navbar />
            <section className="register clearfix">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 my-3">
                            <div className="login_box_img">
                                <img className="img-fluid" src="" alt="" />
                                <div className="detail-login">
                                    <h4>New to our website?</h4>
                                    <p>
                                        There are advances being made in science and technology everyday, and a good
                                        example of this is the
                                    </p>
                                    {/* {{-- <a className="primary-btn" href="{{ route('site.register') }}">Create an Account</a> --}}
                        <a className="primary-btn" href="{{ route('login.create') }}">Create an Account</a> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 my-3">
                            <div className="form_inner register">
                                <h3>Registerr</h3>
                                {/* <form onSubmit={registerSubmit}> */}

                                <form className="row form" onSubmit={registerSubmit}>
                                    <div className="col-md-12 form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            onChange={handleInput}
                                            value={registerInput.email}
                                            placeholder="Enter Email"
                                        />
                                        <span>{registerInput.error_list.email}</span>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            onChange={handleInput}
                                            value={registerInput.name}
                                            placeholder="Enter Name"
                                        />
                                        <span>{registerInput.error_list.name}</span>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="phone"
                                            onChange={handleInput}
                                            value={registerInput.phone}
                                            placeholder="Enter Phone"
                                        />
                                        <span>{registerInput.error_list.phone}</span>
                                    </div>
                                    <div className="col-md-12 form-group" role="group">
                                        {/* <label for="gender">Giới Tính</label> */}
                                        <select
                                            name="gender"
                                            id="gender"
                                            className="form-control"
                                            onChange={handleInput}
                                            value={registerInput.gender}
                                        >
                                            <option value="" className="text-center">
                                                --Gender--
                                            </option>
                                            <option value="0">Male</option>
                                            <option value="1">Female</option>
                                            <option value="2">Other</option>
                                        </select>
                                        <span>{registerInput.error_list.gender}</span>
                                    </div>

                                    <div className="col-md-12 form-group">
                                        <input
                                            type={list.showPass ? 'text' : 'password'}
                                            className="form-control"
                                            name="password"
                                            onChange={handleInput}
                                            value={registerInput.password}
                                            placeholder="Password"
                                        />
                                        <span>{registerInput.error_list.password}</span>
                                        <span className="eye" onClick={handleShowPass}>
                                            <i
                                                className={list.showPass ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                                            ></i>
                                        </span>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <button type="submit" value="submit" className="primary-btn">
                                            Log In
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Register;
