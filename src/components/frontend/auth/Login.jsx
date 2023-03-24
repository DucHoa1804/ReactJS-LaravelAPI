import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Navbar from '~/layouts/frontend/Navbar';

import '~/assets/frontend/Login.scss';

function Login() {
    const history = useHistory();
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
      
    });
    const[list,setList]=useState({
        showPass: false,
    })//showpass
   
    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    };
    const handleShowPass = () => {
        setList({
            showPass: !list.showPass,
        });
    };
    const loginSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        };
        axios.get('/sanctum/csrf-cookie').then((response) => {
            axios.post(`api/login`, data).then((res) => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal('Success', res.data.message, 'success'); ///message lấy bên laravel hien len hang hinh icon
                   if(res.data.role==='admin'){
                        history.push('/admin/dashboard')
                   }else{
                    history.push('/');

                   }
                } else if (res.data.status === 401) {
                    swal('Warning', res.data.message, 'warning');
                } else {
                    setLogin({ ...loginInput, error_list: res.data.validation_errors });
                }
            });
        });
    };

    return (
        <div>
            <Navbar />
            <section className="login clearfix">
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
                            <div className="form_inner login">
                                <h3>Log in to enter</h3>
                                {/* <form onSubmit={registerSubmit}> */}

                                <form className="row form" onSubmit={loginSubmit}>
                                    <div className="col-md-12 form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            onChange={handleInput}
                                            value={loginInput.email}
                                            placeholder="Enter Email"
                                        />
                                        <span>{loginInput.error_list.email}</span>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <input
                                            type={list.showPass? 'text':'password'}
                                            // type="password"
                                            className="form-control"
                                            name="password"
                                            onChange={handleInput}
                                            value={loginInput.password}
                                            placeholder="Password"
                                        />
                                        <span>{loginInput.error_list.password}</span>
                                        <span className='eye' onClick={handleShowPass}>
                                            <i className={list.showPass?'fa-solid fa-eye':'fa-solid fa-eye-slash'}></i>
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

export default Login;
