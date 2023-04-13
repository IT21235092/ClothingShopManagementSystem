import React, { useState, Component } from 'react';
import { NavLink } from 'react-router-dom';


export default class VReg extends Component {

 
  constructor(props) {
    super(props);

    this.state = {
      OrganizationName: "",
      Email: "",
      password: "",
      userType: "",
      address: "",
      phone_no: "",
      icon: "",
     secretKey:"",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
 

      e.preventDefault();
    const { OrganizationName,Email,password,userType,address,phone_no,icon} = this.state;
    console.log( OrganizationName,Email,password,userType,address,phone_no,icon   );
    fetch(`http://localhost:8000/Vregister`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        OrganizationName,
        Email,
        password,
        userType,
        address,
        phone_no,
        icon
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
      });

    }
   
  

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="container shadow my-5">
          <div className="row justify-content-end">
            <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form order-2">
              <h1 className="display-4 fw-bolder">Hello, Friend</h1>
              <p className="lead text-center">Enter Your Details to Register</p>
              <h5 className="mb-4">OR</h5>
              <NavLink
                to="/"
                className="btn btn-outline-light rounded-pill pb-2 w-50"
              >
                Vendor Login
              </NavLink>
            </div>
            <div className="col-md-6 p-5">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                Organization Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="OrganizationName"
                  name="OrganizationName"
                  onChange={(e) => this.setState({ OrganizationName: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  name="Email"
                  onChange={(e) => this.setState({ Email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
        
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Phone Num
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone_no"
                  name="phone_no"
                  onChange={(e) => this.setState({ phone_no: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  onChange={(e) => this.setState({ address: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Icon
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="icon"
                  name="icon"
                  onChange={(e) => this.setState({ icon: e.target.value })}
                />
              </div>
               
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  I Agree Terms and Conditions
                </label>
                <label className="form-check-label" htmlFor="exampleCheck1">
                  <a href="/register">   User</a>
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-outline-primary w-100 mt-4 rounded-pill"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </form>
   

    );
}

}
