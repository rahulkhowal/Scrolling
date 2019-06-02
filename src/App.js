import React,{Component} from 'react';
//import logo from './logo.svg';
import './index.css';
import ContactList from './List/AssetList'

class App extends Component  {
  render(){
    return (
       <div className="container">
          <h1>List-View</h1>
          <ContactList/>
       </div>
    );
  }
}

export default App;
