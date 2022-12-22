import React,{Component} from "react";
import { connect } from 'react-redux';
import NavHeader from "./components/NavHeader";
import {Home} from "./Home";

import './style.css';

class App extends Component {
  
  render() {
    return (<div className="App">
                <NavHeader isApprover={this.props.user.role==="admin"}/>
                <Home isApprover={this.props.user.role==="admin"}/>        
            </div>
  );}
}

  
const mapStateToProps = (state) => {
  return {
    user: state.user     
  };
}


export default connect(mapStateToProps, null)(App);

/*improvement:

 1.reject with comments
 2.scheduled publish
 3.status is scheduled publish but approver decides to reject
 4.sort by created date
 5.filter by created|approved|published
 6.pagination and lazy loading on widget list
 7.audit and history
 8. real time app with web socket
*/
