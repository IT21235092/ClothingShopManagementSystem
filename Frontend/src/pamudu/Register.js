import React, { useState, Component } from 'react';
import { NavLink } from 'react-router-dom';


export default class Register extends Component {

 
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      email: "",
      password: "",
      userType: "",
      secretKey: "",
     telephone: "",
     address: "",
     firstname: "",
     lastname: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    if(this.state.userType=="Admin" && this.state.secretKey != "PamuduX" || this.state.userType=="Vendor" && this.state.secretKey != "PamuduX"){
      e.preventDefault();
      alert("Invalid Admin");
    }else {

      e.preventDefault();
    const { user, email, password,userType,telephone,address,firstname,lastname } = this.state;
    console.log(user, email, password,userType,telephone,address,firstname,lastname );
    fetch(`http://localhost:8000/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user,
        email,
        password,
        userType,
        telephone,
        address,
        firstname,
        lastname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
      });

    }
   
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
                Login
              </NavLink>
            </div>
            <div className="col-md-6 p-5">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  name="firstname"
                  onChange={(e) => this.setState({ firstname: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  name="lastname"
                  onChange={(e) => this.setState({ lastname: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="username"
                  onChange={(e) => this.setState({ user: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  onChange={(e) => this.setState({ password: e.target.value })}
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
                  Tele-Phone Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="firstname"
                  name="telephone"
                  onChange={(e) => this.setState({ telephone: e.target.value })}
                />
              </div>
              <div className="mb-3 ">
                <input
                  type="radio"
                  name ="userType"
                  value="User"
                  onChange={(e) => this.setState({ userType: e.target.value })}
                /> 
                User <input
                type="radio"
                name ="userType"
                value="Admin"
                onChange={(e) => this.setState({ userType: e.target.value })}
              /> Admin

                <input
                type="radio"
                name ="userType"
                value="Vendor"
                onChange={(e) => this.setState({ userType: e.target.value })}
              /> Vendor
                
              </div>

              {this.state.userType =="Admin" || this.state.userType == "Vendor"?(
              <div className="mb-3">
                <label  className="form-label">
                  Secret Key
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder='Secret Key'
                  onChange={(e) => this.setState({ secretKey: e.target.value })}
                />
               </div>):null}
               
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  I Agree Terms and Conditions
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
