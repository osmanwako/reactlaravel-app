import React, { Component } from "react";
import Customers from "./components/data";
import MenuBar from "./components/header";
import Register from "./components/register";

class App extends Component {
 
  render() {
    return (
      <div className="fluid">
        <MenuBar />
        <Register />
        <Customers/>
      </div>
    );
  }
}

export default App;
