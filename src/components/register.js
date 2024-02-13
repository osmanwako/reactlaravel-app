export default function Register() {
  return (
    <form className="ui form">
      <div className="fields">
        <div className="four wide field">
          <label>First Name</label>
          <input type="text" placeholder="Enter first name" />
        </div>

        <div className="four wide field">
          <label>Last Name</label>
          <input type="text" placeholder="Enter last name" />
        </div>

        <div className="four wide field">
          <label>Email</label>
          <input type="email" placeholder="Enter email" />
        </div>

        <div className="four wide field">
          <label>Birth Date</label>
          <input type="date" placeholder="Enter Customer" />
        </div>
        <div className="four wide field d-flex-center">
          <button className="ui primary button">Save</button>
        </div>
      </div>
    </form>
  );
}
