import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({component: Component, state, actions, isAuthenticated, ...rest}) => {
    if(!isAuthenticated) {
        return <Redirect to="/login" />
    }

    return <Route 
                {...rest}
                render={(routeProps) => (
                    <Component {...routeProps} state={state} actions={actions} />
                )}
            />
}

export { PrivateRoute };