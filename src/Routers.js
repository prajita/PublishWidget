import React from "react";
import { Router, Route, Routes } from 'react-router-dom';
import history from './history';
import App from './App';

const Routers = () => {
    return (
        <Router location={history.location} navigator={history} >
            <Routes>
                <Route exact path="/" element={<App/>} />
                <Route exact path="/publish" element={<App isApprover={true}/>} />
            </Routes>
        </Router >)
}



export default Routers;