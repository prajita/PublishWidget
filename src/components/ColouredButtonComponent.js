import * as React from 'react';

export const ColouredButtonComponent = props=>{
    const {status} = props;
    let colorstyle = "";

    switch (status){
        case "created":
            colorstyle = "darkgreen";
            break;
        case "updated":
            colorstyle = "navy";
            break;
        case "approved":
            colorstyle = "palevioletred";
            break;
        case "published":
            colorstyle = "black";
            break;
        case "rejected":
            colorstyle = "crimson";
            break;
        default:
            colorstyle = "purple";
            break;
        
    }
    const styles = {
        color:'blue',
        "background-color":colorstyle
      }
    return <button id="btn-id" disabled style={styles} {...props}>{status}</button>;
}
