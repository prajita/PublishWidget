import React, { Component } from 'react';
import '../style.css';
import { Link } from 'react-router-dom';

export default class NavHeader extends Component {
    render() {
        return (
            <nav className="nav">
                <ul className="navbar-nav">
                    <li className="">
                    {this.props.isApprover ? <Link className="nav-link" to='/publish'>Back to Home</Link> : 
                        <Link className="nav-link" to='/'>Back to Home</Link>}
                    </li>
                </ul>
            </nav>
        )
    }
}