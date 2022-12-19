import React from "react";
import { ButtonComponent } from "../components/ButtonComponent";


export const ApproverActions = props =>{
    const {status, approveWidget = ()=>{}, publishWidget = ()=>{}}=props;
    return  (
        <div>
            {status==="approved" ? <ButtonComponent onClick={publishWidget}>Publish</ButtonComponent>
            :status==="created" ? <ButtonComponent onClick={approveWidget}>Approve</ButtonComponent>:null}
        </div>
    );
}