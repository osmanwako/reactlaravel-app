import React, { Component } from "react";

export default class Register extends Component {
  state = {
    customer: { firstname: "", lastname: "", email: "", birthdate: "" },
  };
  componentDidUpdate(prevprov) {
    if (this.props.customer && prevprov !== this.props) {
      this.setState({ customer: { ...this.props.customer } });
    }
  }

  getChange = (event) => {
    const { name, value } = event.target;
    let { customer } = this.state;
    customer[name] = value;
    this.setState({ customer });
  };

  register = () => {
    let customer = { firstname: "", lastname: "", email: "", birthdate: "" };
    this.setState({ customer });
    this.props.changedit();
  };

  render() {
    return (
      <div className="ui container mh">
        <form className="ui form">
          <div className="fields">
            <div className="four wide field">
              <label>First Name</label>
              <input
                type="text"
                placeholder="Enter first name"
                name="firstname"
                value={this.state.customer.firstname}
                onChange={this.getChange}
              />
            </div>

            <div className="four wide field">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Enter last name"
                name="lastname"
                value={this.state.customer.lastname}
                onChange={this.getChange}
              />
            </div>

            <div className="four wide field">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                value={this.state.customer.email}
                onChange={this.getChange}
              />
            </div>

            <div className="four wide field">
              <label>Birth Date</label>
              <input
                type="date"
                placeholder="Enter Customer"
                name="birthdate"
                value={this.state.customer.birthdate}
                onChange={this.getChange}
              />
            </div>
            {this.props.customer ? (
              <div className="four wide field d-flex-center">
                <button className="ui green button">Update</button>
                <button
                  className="ui brown button"
                  onClick={() => this.register()}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="four wide field d-flex-center">
                <button className="ui primary button">Save</button>
              </div>
            )}
          </div>
        </form>
        <div className="ui divider"></div>
      </div>
    );
  }
}
