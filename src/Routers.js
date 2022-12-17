import React from "react";
import { Router, Route, Routes } from 'react-router-dom';
import history from './history';
import App from './App';

const Routers = () => {
    return (
        <Router location={history.location} navigator={history} >
            <Routes>
                <Route exact path="/" element={<App/>} />
            </Routes>
        </Router >)
}



export default Routers;