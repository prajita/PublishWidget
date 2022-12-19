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
