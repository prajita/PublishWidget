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
    rejectWidget,
    requestLogout
  } from '../actions';

import 'react-responsive-modal/styles.css';
import '../style.css';
import { ButtonComponent } from "../components/ButtonComponent";
import {SearchSectionComponent} from "../components/SearchSectionComponent";
import {FilterSectionComponent} from "../components/FilterSectionComponent";
import Logout from "../Logout/Logout";
import history from "../history";




class  Home extends PureComponent{

    constructor(props) {
        super(props);
        this.state = {
          currWidgetId: -1,
          checkConfirmDeletion: false,
          updatedWidgets: props.widgets||[],
          filteredWidgets:  props.widgets||[],
          selectedFilter: [],
          confirmLogoutModal: false
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
        this.updateFiltered = this.updateFiltered.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.onClickLogout = this.onClickLogout.bind(this);
        this.confirmLogout = this.confirmLogout.bind(this);
    }

    componentDidMount(){
      this.props.requestWidgets();
    }

    clearAll(){
      this.setState({updatedWidgets: this.props.widgets, searchStr:"", selectedFilter:[]});
    }

    onClickAddWidget(){
      this.clearAll();
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
    onClickLogout(){
      this.setState({confirmLogoutModal: true});
    }
    confirmLogout(){
      this.props.requestLogout();
      history.push({
          pathname:"/"
      }, ()=>{});
    }
    submitCreateWidget(obj) {
        this.props.createWidget(obj);
        this.props.closeWidgetModal();
    }
    submitUpdateWidget(obj) {
      this.clearAll();
      this.props.updateWidget(obj);
      this.props.closeWidgetModal();
    }
    callDeleteWidget(){
      const {widgets, deleteWidget} = this.props;
      const {currWidgetId}=this.state;
      const widgetToDelete = widgets.find(e=>e._id === currWidgetId);
      deleteWidget(widgetToDelete._id);
      this.setState({checkConfirmDeletion: false, updatedWidgets: widgets, searchStr:"", selectedFilter:[] });
    }

    callPublishWidget(id){
      this.props.publishWidget(id);
      this.clearAll();
    }
    callApproveWidget(id){
      this.props.approveWidget(id);
      this.clearAll();
    }
    callRejectWidget(id){
      this.props.rejectWidget(id);
      this.clearAll();
    }
    updateSearchString(searchStr){
      const {filteredWidgets, selectedFilter}=this.state;
      const {widgets}=this.props;
      const toFilter = selectedFilter.length>0? filteredWidgets : widgets;
      const updatedWidgets = toFilter.filter(e=>e.title.toLowerCase().includes(searchStr.toLowerCase()));
      this.setState({updatedWidgets, searchStr});
    }

    updateFiltered(values){
      const {widgets}=this.props;
      const listOfEntries = values.map(e=>e.value);
      const filteredWidgets = (values && values.length>0) ? widgets.filter(e=>listOfEntries.includes(e.status)): widgets;
      this.setState({filteredWidgets, selectedFilter: values , searchStr: ""});
    }
    
    render(){
        const { widgets, addWidgetModal, editWidgetModal, isApprover} = this.props;
        const {currWidgetId, checkConfirmDeletion, updatedWidgets, searchStr, selectedFilter, filteredWidgets, confirmLogoutModal}=this.state;
        const currWidget  = (currWidgetId!==-1 && editWidgetModal) ? widgets.find(e=>e._id===currWidgetId) : {};
        const currList =  searchStr ? updatedWidgets : selectedFilter.length>0 ? filteredWidgets : widgets;
        
        return (
              <>
                <div>
                    <div className="row">
                      <div className="col-9 my-widget-header">
                        <label >Threat Reports {isApprover ? "Admin View": ""}</label>
                      </div>
                      {!isApprover && <div className="col-3">
                        <ButtonComponent variant="contained" onClick={this.onClickAddWidget}>Add Widget</ButtonComponent>
                        <nav className="nav"> 
                            <span onClick={this.onClickLogout}>Logout</span>
                        </nav>
                      </div>}
                    </div>
                </div>
                <div className="search-filter-wrapper">
                  <SearchSectionComponent value={searchStr} updateSearchString={this.updateSearchString}/>
                  <span className="filter-section">
                      <FilterSectionComponent value={selectedFilter} updateFiltered={this.updateFiltered}/>
                  </span>
                </div>
                <WidgetsListContainer 
                    isApprover ={isApprover}
                    list={currList} 
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
                {confirmLogoutModal &&
                    <Logout confirmLogoutUser={this.confirmLogout}/>
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
    publishWidget: PropTypes.func,
    requestLogout: PropTypes.func
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
        rejectWidget,
        requestLogout
      }, dispatch
    )
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
