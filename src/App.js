import React,{Component} from "react";
import {Home} from "./Home";
import './style.css';

class App extends Component {
  render() {
    return (<div className="App">
      <header className="App-header">
        <p>
          Hello Widget!!!
          <Home/>
        </p>
        
      </header>
    </div>
  );}
}

export default App;
