import React from "react";
import { ButtonComponent } from "../components/ButtonComponent";


export const ApproverActions = props =>{
    const {status, approveWidget = ()=>{}, rejectWidget=()=>{}, publishWidget = ()=>{}}=props;

    const displayButtons = ()=>{
        if(status==="approved"){
            return(<>
                <ButtonComponent className="publish-btn" onClick={publishWidget}>Publish</ButtonComponent>
                <ButtonComponent disabled  onClick={rejectWidget}>Reject</ButtonComponent>
            </>)
        }else if(status==="created"|| status==="updated"){
            return(<>
                <ButtonComponent className="approve-btn" onClick={approveWidget}>Approve</ButtonComponent>
                <ButtonComponent className="reject-btn" onClick={rejectWidget}>Reject</ButtonComponent>
            </>)
        }
    }

    return  (
        <div>
            {displayButtons()}
        </div>);
}

    
