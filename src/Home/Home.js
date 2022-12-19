import React, {PureComponent} from "react";
import Modal from 'react-responsive-modal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import WidgetModalContainer from "../containers/WidgetModalContainer";
import WidgetsListContainer from "../containers/WidgetsListContainer";
import {
    openAddWidgetModal,
    openEditWidgetModal,
    closeWidgetModal,
    requestWidgets,
    createWidget,
    updateWidget
  } from '../actions';

import 'react-responsive-modal/styles.css';
import '../style.css';
import { ButtonComponent } from "../components/ButtonComponent";


class  Home extends PureComponent{

    constructor(props) {
        super(props);
        this.state = {
          currWidgetIndex: -1,
          checkConfirmDeletion: false
        }
        this.onClickAddWidget = this.onClickAddWidget.bind(this);
        this.onClickModalClose = this.onClickModalClose.bind(this);
        this.submitCreateWidget = this.submitCreateWidget.bind(this);
        this.onClickEditWidget = this.onClickEditWidget.bind(this);
        this.onClickDeleteWidget = this.onClickDeleteWidget.bind(this);
    }

    componentDidMount(){
        this.props.requestWidgets();
    }

    onClickAddWidget(){
        this.props.openAddWidgetModal();
    }
    onClickEditWidget(key){
      this.setState({currWidgetIndex: key});
      this.props.openEditWidgetModal();
    }
    onClickDeleteWidget(key){
      this.setState({currWidgetIndex: key, checkConfirmDeletion: true});
    }
    
    onClickModalClose() {
        this.props.closeWidgetModal();
    }
    submitCreateWidget(obj) {
        this.props.createWidget(obj);
        this.props.closeWidgetModal();
    }

    submitUpdateWidget(obj) {
      this.props.updateWidget(obj);
      this.props.closeWidgetModal();
  }
    
    render(){
        const { widgets, addWidgetModal, editWidgetModal, isApprover} = this.props;
        const {currWidgetIndex, checkConfirmDeletion}=this.state;
        const currWidget  = (currWidgetIndex!==-1 && editWidgetModal) ? widgets[currWidgetIndex] : {};
        
        return (
              <>
                <div>
                    <div className="row">
                      <div className="col-9 my-widget-header">
                        <label >My Widgets {isApprover ? "Admin View": ""}</label>
                      </div>
                      <div className="col-3">
                        <ButtonComponent variant="contained" onClick={this.onClickAddWidget}>Add Widget</ButtonComponent>
                      </div>
                    </div>
                </div>
                
                <WidgetsListContainer 
                    isApprover ={isApprover}
                    list={widgets} 
                    onClickEditWidget={this.onClickEditWidget}
                    onClickDeleteWidget={this.onClickDeleteWidget}
                />
                {checkConfirmDeletion &&
                    <Modal 
                          classNames={{
                            modal: "customModalConfirmDelete",
                          }}
                          open 
                          onClose={()=>this.setState({checkConfirmDeletion: false})}>
                          <div className="delete-confirm">
                              <span>Are you sure you want to delete?</span>
                              <div className="delete-confirm-action-buttons">
                                  <ButtonComponent>confirm</ButtonComponent>
                                  <ButtonComponent>cancel</ButtonComponent>
                              </div>
                          </div>
                    </Modal>
                }
                
                {(addWidgetModal || editWidgetModal) &&
                  <Modal 
                      open={addWidgetModal || editWidgetModal} 
                      onClose={this.onClickModalClose} 
                      classNames={{
                        modal: "customModalWidget"
                      }}
                      center >
                    <WidgetModalContainer 
                        isApprover ={isApprover}
                        editType={editWidgetModal}
                        widgetData={currWidget}
                        submitCreateWidget={obj=>this.submitCreateWidget(obj)}
                        submitUpdateWidget={obj=>this.submitUpdateWidget(obj)}
                    />
                  </Modal>}
              </>
          );
    }
        
    
}

Home.propTypes = {
    addWidgetModal: PropTypes.bool ,
    editWidgetModal: PropTypes.bool,
    requestWidgets: PropTypes.func ,
    createWidget: PropTypes.func ,
    updateWidget: PropTypes.func
  };
  
const mapStateToProps = (state) => {
  return {
    addWidgetModal: state.addWidgetModal ,
    editWidgetModal: state.editWidgetModal,
    loading: state.loading,
    widgets: state.widgets     
  };
}
const mapDispatchToProps = (dispatch) => {
  return (
    bindActionCreators(
      {
        openAddWidgetModal ,
        openEditWidgetModal,
        closeWidgetModal,
        requestWidgets ,
        createWidget,
        updateWidget
      }, dispatch
    )
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


/**
 * 
 * 
 * 
 * mongodb+srv://prajita:<password>@cluster0.pu3knii.mongodb.net/?retryWrites=true&w=majority
 * 
 * 
 * mongosh "mongodb+srv://cluster0.pu3knii.mongodb.net/myFirstDatabase" --apiVersion 1 --username prajita
 * 
 */