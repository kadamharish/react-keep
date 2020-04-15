import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as Constant from '../constants'

function PrivateRoute({ component: Component, ...rest }) {
    let data = sessionStorage.getItem(Constant.USER_DETAILS)
    return (
        <Route {...rest} render={props => (
            (data) ? <Component {...props} /> : <Redirect to="/login" />
        )}></Route>
    );
};

export default PrivateRoute;
