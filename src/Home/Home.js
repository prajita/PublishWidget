import React, {Component} from "react";
import Modal from 'react-responsive-modal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreateWidgetContainer from "../containers/CreateWidgetContainer";
import NavHeader from "../components/NavHeader";
import {
    openAddWidgetModal,
    closeAddWidgetModal
  } from '../actions';

import 'react-responsive-modal/styles.css';
import '../style.css';


class  Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
          currWidget: {}
        }
        this.onClickAddWidget = this.onClickAddWidget.bind(this);
        this.onClickModalClose = this.onClickModalClose.bind(this);
        this.submitCreateWidget = this.submitCreateWidget.bind(this);
      }
    onClickAddWidget(){
        this.props.openAddWidgetModal();
    }
    
    onClickModalClose() {
        this.props.closeAddWidgetModal();
    }
    submitCreateWidget() {
        this.props.closeAddWidgetModal();
    }
    
    render(){
        return (
            <div className="App">
              <>
                <NavHeader addWidget={true} onClickAddWidget={this.onClickAddWidget} onClickModalClose={this.onClickModalClose} />
                
                {this.props.addWidgetModal &&
                  <Modal open={this.props.addWidgetModal || false} onClose={this.onClickModalClose} center >
                    <CreateWidgetContainer submitCreateWidget={this.submitCreateWidget} />
                  </Modal>}
              </>
            </div>
          );
    }
        
    
}

Home.propTypes = {
    addWidgetModal: PropTypes.bool  
  };
  
  const mapStateToProps = (state) => {
    return {
      addWidgetModal: state.addWidgetModal      
    };
  }
  const mapDispatchToProps = (dispatch) => {
    return (
      bindActionCreators(
        {
          openAddWidgetModal ,
          closeAddWidgetModal 
        }, dispatch
      )
    )
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Home);
