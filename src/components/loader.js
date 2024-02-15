import React, { Component } from "react";

export default class Loader extends Component {
  render() {
    return <div className="ui active inverted dimmer">
        <div className="ui active centered inline loader"></div>
    </div>;
  }
}
