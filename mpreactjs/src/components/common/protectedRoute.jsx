import React from 'react';
import auth from '../../services/authService'
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
    return <Route 
    // path={path}
    {...rest}
    render={props => {
      if (!auth.getCurrentUser()) return <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
      return Component ? <Component {...props} /> : render(props)
    }} />
}

export default ProtectedRoute;