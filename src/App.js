import React,{Component} from "react";
import NavHeader from "./components/NavHeader";
import {Home} from "./Home";
import './style.css';

class App extends Component {
  
  render() {
    return (<div className="App">
                <NavHeader isApprover={this.props.isApprover}/>
                <Home isApprover={this.props.isApprover}/>        
            </div>
  );}
}

export default App;

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
