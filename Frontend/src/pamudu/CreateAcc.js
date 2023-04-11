import React, { Component } from 'react'
import axios from 'axios'

export default class CreateAcc extends Component {

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
      <div className ="col-md-8 mt-4 mx-auto">
        <h1 className='h3 mb-3 font-weight-normal'>Create new post</h1>
        <form className='need-validation' onSubmit={this.handleSubmit} noValidate>
          <div className ='form-group' style={{marginBottom:'15px'}}>
            <lable  style={{marginBottom:'5px'}}>First Name</lable>
            <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  name="firstname"
                  placeholder='Enter the First Name'
                  onChange={(e) => this.setState({ firstname: e.target.value })}
                />
          </div>

          <div className ='form-group' style={{marginBottom:'15px'}}>
            <lable  style={{marginBottom:'5px'}}>Last Name</lable>
            <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  name="lastname"
                  placeholder='Enter the Last Name'
                  onChange={(e) => this.setState({ lastname: e.target.value })}/>
          </div>

          <div className ='form-group' style={{marginBottom:'15px'}}>
            <lable  style={{marginBottom:'5px'}}>User Name</lable>
            <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="username"
                  placeholder='Enter the User Name'
                  onChange={(e) => this.setState({ user: e.target.value })}
                />
          </div>

          <div className ='form-group' style={{marginBottom:'15px'}}>
            <lable  style={{marginBottom:'5px'}}>Email</lable>
            <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  placeholder='Enter the Email'
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
          </div>


          <div className ='form-group' style={{marginBottom:'15px'}}>
            <lable  style={{marginBottom:'5px'}}>Password</lable>
            <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  placeholder='Enter the Password'
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
          </div>

          <div className ='form-group' style={{marginBottom:'15px'}}>
            <lable  style={{marginBottom:'5px'}}>Address</lable>
            <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  placeholder='Enter the Address'
                  onChange={(e) => this.setState({ address: e.target.value })}
                />
          </div>

          <div className ='form-group' style={{marginBottom:'15px'}}>
            <lable  style={{marginBottom:'5px'}}>Tele-Phone</lable>
            <input
                  type="number"
                  className="form-control"
                  id="firstname"
                  name="telephone"
                  placeholder='Enter the Tele-Phone Number'
                  onChange={(e) => this.setState({ telephone: e.target.value })}
                />
          </div>

          <div className ='form-group' style={{marginBottom:'15px'}}>
            <lable  style={{marginBottom:'5px'}}>User Type</lable>
            <br/>
            <br/>
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

          <button className ="btn btn-outline-primary w-45 mt-4 rounded-pill" type='submit'>
            <i className="far fa-check-square"></i>
            &nbsp; save
          </button>
          <br/>
          <br/>
        </form>
      </div>
      
    )
  }
}
