import React from "react";
import { Route, Navigate } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
    const isAuthenticated = true;
    console.log(isAuthenticated);
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="login" />
                )
            }
        />
    );
}
