import axios from "axios";
import { Component } from "react";
import AddCustomer from "./addcustomer";
import ListCustomer from "./listcustomer";
import Loader from "./loader";

export default class Customer extends Component {
  state = {
    url: "http://localhost:8000/api/customers",
    customers: [],
    customer: null,
    loading: true,
    error: null,
    errors: [],
    message: null,
  };

  componentDidMount() {
    this.getcustomers();
  }

  getcustomers = async () => {
    this.setState({ loading: true });
    try {
      await axios
        .get(this.state.url)
        .then((res) =>
          this.setState({ customers: res.data.customers, loading: false })
        )
        .catch((err) => {
          this.setState({ error: err.message });
        });
    } catch (error) {
      this.setState({ error: error.message });
    }
    this.setState({ loading: false });
  };

  deletecustomer = async (id) => {
    this.setState({ loading: true });
    const path = `${this.state.url}/${id}`;
    try {
      await axios
        .delete(path)
        .then((res) => {
          const customers = this.state.customers.filter(
            (customer) => customer.id !== id
          );
          this.setState({ customers: customers, loading: false });
        })
        .catch((err) => {
          this.setState({ error: err.message });
        });
    } catch (error) {
      this.setState({ error: error.message });
    }
    this.setState({ loading: false });
  };

  editcustomer = (customer) => {
    this.setState({ customer: customer });
  };

  createform = () => {
    this.setState({ customer: null });
  };

  createcustomer = async (newcustomer) => {
    this.setState({ customer: null, loading: true });
    try {
      await axios
        .post(this.state.url, newcustomer)
        .then((res) => {
        const {customer}=res.data;
          let { customers } = this.state;
          if(customer){
            customers = [customer, ...customers];
          }
          this.setState({ customers });
        })
        .catch((err) => {
          this.setState({ errors: err.message });
        });
    } catch (error) {
      this.setState({ error: error.message });
    }
    this.setState({ loading: false });
  };

  updatecustomer = async (newcustomer, id) => {
    this.setState({ customer: null, loading: true });
    const path = `${this.state.url}/${id}`;
    try {
      await axios
        .put(path, newcustomer)
        .then((res) => {
          const editCustomer = res.data.customer;
          const customers = this.state.customers.map((customer) =>
            customer.id === id ? editCustomer : customer
          );
          this.setState({ customers });
        })
        .catch((err) => {
          this.setState({ errors: err.message });
        });
    } catch (error) {
      this.setState({ error: error.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <div className="ui container mh">
        <AddCustomer
          customer={this.state.customer}
          createform={this.createform}
          createcustomer={this.createcustomer}
          updatecustomer={this.updatecustomer}
        />
        <div className="ui divider"></div>
        {this.state.loading ? <Loader /> : ""}
        {this.state.customers.length > 0 ? (
          <ListCustomer
            customers={this.state.customers}
            editcustomer={this.editcustomer}
            deletecustomer={this.deletecustomer}
          />
        ) : (
          <p>No registered customer record.</p>
        )}
      </div>
    );
  }
}
