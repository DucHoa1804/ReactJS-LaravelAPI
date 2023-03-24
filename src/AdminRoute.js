import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import MasterLayout from './layouts/backend/MasterLayout';
import Skeleton from 'react-loading-skeleton';
import load from '~/assets/images/background/id-loading.gif'
function AdminRoute({...rest}) {
    const history=useHistory();
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/checkAuth`).then(res => {
            if (res.status === 200) {
                setAuth(true);
            }
            setLoading(false)
        });
        return () => {
            setAuth(false);
        };
    }, []);
    axios.interceptors.response.use(undefined,function axiosRetryInterceptor(err){
        if(err.response.state===401){
            swal("unauthorize",err.response.data.message,'warning');
            history.push('/');

        }
        return Promise.reject(err);
    });
    axios.interceptors.response.use(function(response){
        return response;
        },function(error){
            if(error.response.status===403){//acces ko đủ quyền năng
                    swal('Forbidden',error.response.data.message,"warning");
                    history.push('/403');
            }
            else if(error.response.status===404){//not found
                swal('404 Error',"Url/Page Not Found","warning");
                history.push('/404');
            }
            return Promise.reject(error);
        }
    );
    if(loading ){
       
        return <img src={load} alt="Logo" width='100%' />
    }
    return (
        <Route {...rest}
            render={ ({ props, location }) =>auth ?
            ( <MasterLayout {...props} /> )  : 
            ( <Redirect to={{ pathname: "/login", state: { from: location } }}/>)
            }
        />
    );
}

export default AdminRoute;
