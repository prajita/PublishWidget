import React from "react";
import { ButtonComponent } from "../components/ButtonComponent";


export const ApproverActions = props =>{
    const {isApproved=false}=props;
    return  (
        <div>
            {isApproved ? <ButtonComponent>Publish</ButtonComponent>
            :<ButtonComponent>Approve</ButtonComponent>}
        </div>
    );
}