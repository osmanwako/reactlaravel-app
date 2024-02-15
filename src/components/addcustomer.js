import React, { Component } from "react";
import Message from "./message";

export default class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
      }
  state = {
    customer: { firstname: "", lastname: "", email: "", birthdate: "" },
    message: "",
  };

  componentDidUpdate(prevprov) {
    if (this.props.customer && prevprov !== this.props) {
      this.setState({
        customer: { ...this.props.customer },
        message: "",
      });
      this.inputRef.current.focus();
    }
  }

  getChange = (event) => {
    const { name, value } = event.target;
    let { customer } = this.state;
    customer[name] = value;
    this.setState({ customer,message:'' });
  };

  createform = () => {
    let customer = { firstname: "", lastname: "", email: "", birthdate: "" };
    this.setState({ customer,message:'' });
    this.props.createform();
  };

 

  validtoSave = () => {
    const { email, firstname, lastname, birthdate } = this.state.customer;
    const checkBirthdate = isNaN(Date.parse(birthdate));
    const checkEmail = /^[a-zA-Z._0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    let message = "";
    let result = true;

    if (!firstname.trim()) {
        message = "First Name is required.";
        result = false;
    } else if (firstname.length < 3 || firstname.length > 15) {
        message = "First Name must be between 3 and 15 characters.";
        result = false;
    } else if (!lastname.trim()) {
        message = "Last Name is required.";
        result = false;
    } else if (lastname.length < 3 || lastname.length > 15) {
        message = "Last Name must be between 3 and 15 characters.";
        result = false;
    } else if (!checkEmail.test(email)) {
        message = "Email is invalid.";
        result = false;
    } else if (email.length < 7 || email.length > 50) {
        message = "Email must be between 7 and 50 characters.";
        result = false;
    } else if (checkBirthdate) {
        message = "Birth Date is invalid.";
        result = false;
    } else {
        const birthdateDate = new Date(birthdate);
        const age = new Date().getFullYear() - birthdateDate.getFullYear();

        if (age < 18 || age > 60) {
            message = "Birth Date must be between 18 and 60 years old.";
            result = false;
        }
    }

    this.setState({ message });
    return result;
};

  validtoupdate = () => {
    const { customer } = this.state;
    const { email, firstname, lastname, birthdate } = customer;
    this.setState({ message: "" });
    if (!customer) {
      this.setState({ message: "Customer data is invalid" });
      return false;
    }

    if (
      email === this.props.customer.email &&
      firstname === this.props.customer.firstname &&
      lastname === this.props.customer.lastname &&
      birthdate === this.props.customer.birthdate
    ) {
      this.setState({ message: "Customer has no updated attribute" });
      return false;
    }
    return true;
  };

  createcustomer=()=>{
    if(this.validtoSave()){
        this.props.createcustomer(this.state.customer);
    }
  };

  updatecustomer = () => {
    if (this.validtoSave() && this.validtoupdate()){
        const {id}=this.props.customer;
        let customer = { firstname: "", lastname: "", email: "", birthdate: "" };
     this.props.updatecustomer(this.state.customer,id);
     this.setState({ customer});
    }
  };

  render() {
    return (
        <form className="ui form">
          <div className="fields">
            <div className="four wide field">
              <label>First Name</label>
              <input
                type="text"
                ref={this.inputRef}
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
                <button
                  type="button"
                  className="ui green button"
                  onClick={this.updatecustomer}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="ui brown button"
                  onClick={() => this.createform()}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="four wide field d-flex-center">
                <button type='button' className="ui primary button" onClick={this.createcustomer}>Save</button>
              </div>
            )}
          </div>
          {this.state.message && <Message message={this.state.message} />}
        </form>
    );
  }
}
