import React, {useState, Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/style.css';


export default class vendorRegister extends Component {

 
  constructor(props) {
    super(props);

    this.state = {
      OrganizationName: "",
      Email: "",
      password: "",
      userType: "",
      secretKey: "",
      phone_no: "",
      address: "",
      icon: "",
      date: "",
      
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
  
      e.preventDefault();
    const { userType, OrganizationName, Email, address, phone_no, icon, password, date } = this.state;
    console.log(userType, OrganizationName, Email, address, phone_no, icon, password, date );
    fetch(`http://localhost:8000/Vregister`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        userType, 
        OrganizationName, 
        Email, 
        address, 
        phone_no, 
        icon, 
        password, 
        date
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "vendorRegister");

        if(data.status =="ok"){
          alert("registration successfull");
          window.location.href="./";
        }
      });

    
   
  }

  render() {
    return (
        <div>
        <div id="div1">
        <div className="container">
          <h1>Register as a Vendor</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="c1"><input type="text" name="name" placeholder="Organization Name" required  onChange={(e) => this.setState({ OrganizationName: e.target.value })}/></div>
            <div className="c2"><input type="email" name="email" placeholder="Email Address" required  onChange={(e) => this.setState({ Email: e.target.value })}/></div>
            <div className="c3"><input type="text" name="address" placeholder="Postal Address" required onChange={(e) => this.setState({ address: e.target.value })}/></div>
            <div className="c4"><input type="text" name="phone" placeholder="Contact Nuber" required  onChange={(e) => this.setState({ phone_no: e.target.value })}/></div>
            <div className="c5"><input type="file" name="file" placeholder="Insert Oragnization logo" onChange={(e) => this.setState({ phone_no: e.target.value })}/></div>
            <div className="c6"><input type="password" name="password" placeholder="Password" required  onChange={(e) => this.setState({ password: e.target.value })}/></div>
            <div className="c7"><input type="password" name="confirm_password" placeholder="Confirm Password" /></div>
            <div className="c8">
              <input type="checkbox" name="check" required /><label>Accept our Terms &amp; Conditions</label>
            </div>
            <div className="c9">   <input type="submit" name="submit" value="Register" /></div>
          </form>
          <div className="form-message">
            <p>Already have an account?  <NavLink
                to="/"> <a href="#">Log in</a></NavLink></p>
          </div>
        </div>
      </div>
      
      <div className="img">
      <img src={require('../images/vec1.png')}></img>
        <div className="txt">
          <p>Grow your business and <br />reach new <br />heights !</p>
        </div>
      </div>
      </div>
    

    );
}

}
