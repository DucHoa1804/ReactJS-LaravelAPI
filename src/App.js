import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
// import { MasterLayout } from '~/layouts/index';
import axios from 'axios';
import AdminRoute from '~/AdminRoute'
import Home from './components/frontend/Home';
import Register from './components/frontend/auth/Register';
import Login from './components/frontend/auth/Login';
import Page403 from './components/error/Page403';
import Page404 from './components/error/Page404';

axios.defaults.baseURL = 'http://duchoalar/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function(config){
   
    const token=localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/403" component={Page403}/>
                    <Route exact path="/404" component={Page404}/>


                    {/* <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/> */}
                    <Route path="/login">
                    {/* //nếu đã có auth_token thì ko thể vào đc login và register */}
                        {localStorage.getItem('auth_token')?<Redirect to='/'/>:<Login/>}
                    </Route>
                    <Route path="/register">
                        {localStorage.getItem('auth_token')?<Redirect to='/'/>:<Register/>}
                    </Route>
                    {/* <Route path="/admin" name="Admin" render={(props)=>< MasterLayout{...props}/>} /> */}
                    <AdminRoute path="/admin" name="Admin"/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
