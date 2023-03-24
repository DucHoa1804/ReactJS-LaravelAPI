import React from 'react';
import Navbar from '~/layouts/backend/Navbar';
// import Sidebar from '~/layouts/backend/Sidebar';
import Footer from '~/layouts/backend/Footer';
import Routes from '~/routes/index';
import { Switch, Route, Redirect } from 'react-router-dom';
const MasterLayout = () => {
    return (
        <section>
            <Navbar />
            <div className="container-xxl bd-gutter mt-3 my-md-4 bd-layout ">
                <div className="container" style={{ height: '100vh' }}>
                    <Switch>
                        {Routes.map((route, idx) => {
                            return (
                                route.component && (
                                    <Route
                                        key={idx}
                                        path={route.path}
                                        exact={route.exact}
                                        name={route.name}
                                        render={(props) => <route.component {...props} />}
                                    />
                                )
                            );
                        })}
                        <Redirect from="admin" to="/admin/dashboard" />
                    </Switch>
                </div>

                <Footer />
            </div>
        </section>
    );
};
export default MasterLayout;
