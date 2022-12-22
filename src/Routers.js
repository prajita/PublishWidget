import React from "react";
import { Router, Route, Routes } from 'react-router-dom';
import history from './history';
import App from './App';
import { Login } from "./Login";

const Routers = () => {
    return (
        <Router location={history.location} navigator={history} history={history}>
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route exact path="/home" element={<App/>} />
                <Route exact path="/publish" element={<App/>} />
            </Routes>
        </Router >)
}



export default Routers;