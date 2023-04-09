import React, { Component } from 'react'
import axios from 'axios'

export default class AddDetails extends Component {

  constructor(props){
    super(props);
  this.state={
    firstName:"",
    lastName:"",
    address:"",
    email:""

  }

 


  this.handleInputChange = (e) =>{

    const {name,value} = e.target;

    this.setState({

      ...this.state,
      [name]:value
    }

    )
  }

  this.onSubmit = (e) =>{
    e.preventDefault();

    const {firstName,lastName,address,email} = this.state;

    const data ={
      firstName:firstName,
      lastName:lastName,
      address:address,
      email:email
    }

    console.log(data)

    axios.post('http://localhost:8000/emp/save', data).then((res) =>{

      if(res.data.success){

        this.setState({

          firstName:"",
          lastName:"",
          address:"",
          email:""
      
        })


        }
      }
    )
  }

}
  render() {
    return (
      <div className ="col-md-8 mt-4 mx-auto">
        <h1 className='h3 mb-3 font-weight-normal'>Add Employee Details</h1>
        <form className='need-validation' noValidate>
        <div className ='form-group' style={{marginBottom:'15px'}}>
            <lable  style={{marginBottom:'5px'}}>First Name</lable>
            <input type='text' className='form-control' name='firstName' placeholder='First Name' value={this.state.firstName} 
            onChange ={this.handleInputChange}/>
          </div>

          <div className ='form-group' style={{marginBottom:'15px'}}>
            <lable  style={{marginBottom:'5px'}}>Last Name</lable>
            <input type='text' className='form-control' name='lastName' placeholder='Last Name' value={this.state.lastName} 
            onChange ={this.handleInputChange}/>
          </div>

          <div className ='form-group' style={{marginBottom:'15px'}}>
            <lable  style={{marginBottom:'5px'}}>Address</lable>
            <input type='address' className='form-control' name='address' placeholder='Address' value={this.state.address} 
            onChange ={this.handleInputChange}/>
          </div>

          <div className ='form-group' style={{marginBottom:'15px'}}>
            <lable  style={{marginBottom:'5px'}}>Email</lable>
            <input type='email' className='form-control' name='email' placeholder='Email' value={this.state.email} 
            onChange ={this.handleInputChange}/>
          </div>

          <button className ="btn btn-primary  mt-4 rounded-pill" type='submit' style ={{marginTop:'15px'}} onClick={this.onSubmit}>
            <i className="far fa-check-square"></i>
            &nbsp; save
          </button>
       
        </form>
      </div>
      
    )
  }
}
