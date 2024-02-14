import axios from "axios";
import { Component } from "react";
import Loader from "./loader";

export default class Customers extends Component {
  state = {
    customers:[],
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.getcustomers();
  }

  editcustomer = (customer) => {
   this.props.editcustomer(customer);
  };

  getcustomers = async () => {
    this.setState({ loading: true });
    try {
      await axios
        .get("http://localhost:8000/api/customers")
        .then((res) =>
          this.setState({ customers: res.data.customers, loading: false })
        )
        .catch((err) => {
          this.setState({
            loading: false,
            error: err.message,
          });
        });
    } catch (error) {
      this.setState({
        loading: false,
        error: error.message,
      });
    }
    console.log(this.state);
  };
  render() {
    const { customers } = this.state;
    return (
      <div className="ui container mh">
        {this.state.loading?<Loader />:''}
        {customers.length > 0 ? (
          <table className="ui celled table">
            <thead>
              <tr>
                <th className="ui four wide">First Name</th>
                <th className="ui four wide">Last Name</th>
                <th className="ui four wide">E-mail</th>
                <th className="ui two wide">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.firstname}</td>
                  <td>{customer.lastname}</td>
                  <td>{customer.email}</td>
                  <td className="d-flex-center">
                    <button className="ui mini blue button" onClick={()=>this.editcustomer(customer)}>Edit</button>
                    <button className="negative mini ui button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No registered customer record.</p>
        )}
      </div>
    );
  }
}
