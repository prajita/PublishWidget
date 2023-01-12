import React  from "react";
import '../style.css';
import Modal from "react-responsive-modal";
import { ButtonComponent } from "../components/ButtonComponent";

const Logout = props =>{
    return (
      <div>
            <Modal
                classNames={{
                    modal: "customLogoutConfirm",
                }}
                open 
                onClose={()=>this.setState({checkConfirmDeletion: false})}>
                <div className="delete-confirm">
                    <span>Are you sure you want to logout?</span>
                    <div className="logout-confirm-action-buttons">
                        <ButtonComponent onClick={props.confirmLogoutUser}>Logout</ButtonComponent>
                        <ButtonComponent onClick={()=>this.setState({checkConfirmDeletion: false})}>cancel</ButtonComponent>
                    </div>
                </div>
            </Modal>
                
      </div>
  );
}


export default Logout;