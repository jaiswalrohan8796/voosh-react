import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login.js';
import Signup from './Signup.js';
import './style.css';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
