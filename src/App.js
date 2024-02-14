import React, { Component } from "react";
import Customers from "./components/data";
import MenuBar from "./components/header";
import Register from "./components/register";

class App extends Component {
  state = {
    customer:null,
  };

  editcustomer = (data) => {
    this.setState({ customer: data });
  };

  changedit=()=>{
this.setState({customer:null});
  }
 
  render() {
    const {customer}=this.state;
    return (
      <div className="fluid">
        <MenuBar />
        <Register customer={customer} changedit={this.changedit}/>
        <Customers editcustomer={this.editcustomer} />
      </div>
    );
  }
}

export default App;
