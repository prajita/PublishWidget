import React, { Component } from 'react';
import '../style.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default class NavHeader extends Component {
    
   
    render() {
        return (
            <nav className="nav">
                <ul className="navbar-nav">
                    <li className="">
                        <Link className="nav-link" to='/'>Back to Home</Link>
                    </li>
                    {
                        this.props.addWidget &&
                        <li className="nav-item">
                            <Button variant="secondary" onClick={this.props.onClickAddWidget}>Add Wizard</Button>
                        </li>

                    }

                </ul>
            </nav>
        )
    }
}