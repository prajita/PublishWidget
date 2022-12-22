import * as React from 'react';

export const ColouredButtonComponent = props=>{
    const {status} = props;
    let colorstyle = "";

    switch (status){
        case "created":
            colorstyle = "cornflowerblue";
            break;
        case "updated":
            colorstyle = "mediumorchid";
            break;
        case "approved":
            colorstyle = "olivedrab";
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
        "backgroundColor":colorstyle
      }
    return <button id="btn-id" disabled style={styles} {...props}>{status.toUpperCase()}</button>;
}
