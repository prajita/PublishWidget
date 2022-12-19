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
    updateWidget,
    deleteWidget,
    approveWidget,
    publishWidget,
    rejectWidget
  } from '../actions';

import 'react-responsive-modal/styles.css';
import '../style.css';
import { ButtonComponent } from "../components/ButtonComponent";
import {SearchSectionComponent} from "../components/SearchSectionComponent";


class  Home extends PureComponent{

    constructor(props) {
        super(props);
        this.state = {
          currWidgetId: -1,
          checkConfirmDeletion: false,
          updatedWidgets: props.widgets||[]
        }
        this.onClickAddWidget = this.onClickAddWidget.bind(this);
        this.onClickModalClose = this.onClickModalClose.bind(this);
        this.submitCreateWidget = this.submitCreateWidget.bind(this);
        this.onClickEditWidget = this.onClickEditWidget.bind(this);
        this.onClickDeleteWidget = this.onClickDeleteWidget.bind(this);
        this.callDeleteWidget = this.callDeleteWidget.bind(this);
        this.callApproveWidget = this.callApproveWidget.bind(this);
        this.callPublishWidget = this.callPublishWidget.bind(this);
        this.callRejectWidget = this.callRejectWidget.bind(this);
        this.updateSearchString = this.updateSearchString.bind(this);
    }

    componentDidMount(){
        this.props.requestWidgets();
    }

    onClickAddWidget(){
      this.setState({updatedWidgets: this.props.widgets, searchStr:"" });
      this.props.openAddWidgetModal();
    }
    onClickEditWidget(id){
      this.setState({currWidgetId: id});
      this.props.openEditWidgetModal();
    }
    onClickDeleteWidget(id){
      this.setState({currWidgetId: id, checkConfirmDeletion: true});
    }
    onClickModalClose() {
        this.props.closeWidgetModal();
    }
    submitCreateWidget(obj) {
        this.props.createWidget(obj);
        this.props.closeWidgetModal();
    }
    submitUpdateWidget(obj) {
      this.setState({updatedWidgets: this.props.widgets, searchStr:""});
      this.props.updateWidget(obj);
      this.props.closeWidgetModal();
    }
    callDeleteWidget(){
      const {widgets, deleteWidget} = this.props;
      const {currWidgetId}=this.state;
      const widgetToDelete = widgets.find(e=>e._id === currWidgetId);
      deleteWidget(widgetToDelete._id);
      this.setState({checkConfirmDeletion: false, updatedWidgets: widgets, searchStr:"" });
    }

    callPublishWidget(id){
      this.props.publishWidget(id);
      const {widgets} = this.props;
      this.setState({updatedWidgets: widgets, searchStr:"" });
    }
    callApproveWidget(id){
      this.props.approveWidget(id);
      const {widgets} = this.props;
      this.setState({updatedWidgets: widgets, searchStr:"" });
    }
    callRejectWidget(id){
      this.props.rejectWidget(id);
      const {widgets} = this.props;
      this.setState({updatedWidgets: widgets, searchStr:"" });
    }
    updateSearchString(searchStr){
      const {widgets}=this.props;
      const updatedWidgets = widgets.filter(e=>e.title.toLowerCase().includes(searchStr.toLowerCase()));
      this.setState({updatedWidgets, searchStr});
    }
    
    render(){
        const { widgets, addWidgetModal, editWidgetModal, isApprover} = this.props;
        const {currWidgetId, checkConfirmDeletion, updatedWidgets, searchStr}=this.state;
        const currWidget  = (currWidgetId!==-1 && editWidgetModal) ? widgets.find(e=>e._id===currWidgetId) : {};
        
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
                  <SearchSectionComponent value={searchStr} updateSearchString={this.updateSearchString}/>
                
                <WidgetsListContainer 
                    isApprover ={isApprover}
                    list={searchStr ? updatedWidgets: widgets} 
                    onClickEditWidget={this.onClickEditWidget}
                    onClickDeleteWidget={this.onClickDeleteWidget}
                    approveWidget={this.callApproveWidget}
                    publishWidget={this.callPublishWidget}
                    rejectWidget={this.callRejectWidget}
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
                                  <ButtonComponent onClick={this.callDeleteWidget}>confirm</ButtonComponent>
                                  <ButtonComponent onClick={()=>this.setState({checkConfirmDeletion: false})}>cancel</ButtonComponent>
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
    updateWidget: PropTypes.func,
    deleteWidget: PropTypes.func,
    rejectWidget: PropTypes.func,
    approveWidget: PropTypes.func,
    publishWidget: PropTypes.func
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
        updateWidget,
        deleteWidget,
        approveWidget,
        publishWidget,
        rejectWidget
      }, dispatch
    )
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
