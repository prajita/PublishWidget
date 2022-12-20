import React, { Component } from 'react';
import '../style.css';

export default class SpinnerComponent extends Component {
    
    render() {
        return (
            <div className="spinner-container">
                <div className="loading-spinner"></div>
                <div>{this.props.message}</div>
            </div>
        )
    }
}