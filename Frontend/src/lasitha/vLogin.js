import React, { Component, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import '../styles/style2.css';
export default class vendorLogin extends Component {

  
  
  constructor(props){
    super(props)
    this.state={
      Email:"",
      password:"",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){

    e.preventDefault();
    const {  Email, password } = this.state;
    console.log( Email, password);
    fetch(`http://localhost:8000/v`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({

        Email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        

        if(data.status =="ok"){
          alert("login successfull");
          window.localStorage.setItem("token", data.data);
        //   window.localStorage.setItem("loggedIn", true);
          window.location.href="./dash";
        }
      });
  }


  render(){

  return (
    <div>
    <div id="div11">
      <div className="container1">
        <h1>Login as a Vendor</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="c11"><input type="email" name="email" placeholder="Email Address" required onChange={(e) =>
                    this.setState({Email: e.target.value})
                  }/></div>
          <div className="c21"><input type="password" name="password" placeholder="Password" required  onChange={(e) =>
                    this.setState({password: e.target.value})
                  }/></div>
         <div className="c31"><input type="submit" name="submit" value="Login"/></div> 
        </form>
        <div className="form-message1">
          <p>New to this site?  <NavLink
              to="/Vregister"><a href="#">Register</a></NavLink> </p>
        </div>
      </div>
    </div>
  
    <div className="img1">
    <img src={require('../images/vec2.png')}></img>
      <div className="txt1">
        <p>Access your world with just one <br/>click !</p>
      </div>
    </div>
  </div>
  
   
    
  );
}


}