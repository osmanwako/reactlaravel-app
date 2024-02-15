import { Component } from "react";

export default class ListCustomer extends Component {

  render() {
    const { customers } = this.props;
    return (
        <div>
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
                    <button
                      className="ui mini blue button"
                      onClick={() => this.props.editcustomer(customer)}
                    >
                      Edit
                    </button>
                    <button
                      className="negative mini ui button"
                      onClick={() => this.props.deletecustomer(customer.id)}
                    >
                      Delete
                    </button>
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
