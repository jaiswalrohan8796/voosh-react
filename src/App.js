import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login.js";
import Signup from "./Signup.js";
import PrivateRoute from "./components/PrivateRoute.js";
import Dashboard from "./Dashboard.js";
import "./style.css";

export default function App() {
    let isAuthenticated = !!localStorage.getItem("jwt-token");
    return (
        <div>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route
                    exact
                    path="/"
                    element={
                        isAuthenticated ? (
                            <Dashboard />
                        ) : (
                            <Navigate to="login" />
                        )
                    }
                />
            </Routes>
        </div>
    );
}
