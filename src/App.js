import React, { Component } from "react";
import MenuBar from "./components/header";
import Customer from "./components/customer";

class App extends Component {
  render() {
    return (
      <div className="fluid">
        <MenuBar />
        <Customer />
      </div>
    );
  }
}

export default App;
