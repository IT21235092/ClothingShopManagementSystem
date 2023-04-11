import React, { Component } from 'react'
import axios from 'axios'

export default class CusAdd extends Component {

  constructor(props){
    super(props);
  this.state={
    name:"",
    email:"",
    status:""

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

    const {name,email,status} = this.state;

    const data ={
      name:name,
      email:email,
      status:status
    }

    console.log(data)

    axios.post('http://localhost:8000/cus/save', data).then((res) =>{

      if(res.data.success){

        this.setState({

          name:"",
          email:"",
          status:""
      
        })


        }
      }
    )
  }

}
  render() {
    return (
      <div className ="col-md-8 mt-4 mx-auto">
        <h1 className='h3 mb-3 font-weight-normal'>Create new post</h1>
        <form className='need-validation' noValidate>
          <div className ='form-group' style={{marginBottom:'15px'}}>
            <lable  style={{marginBottom:'5px'}}>Name</lable>
            <input type='text' className='form-control' name='name' placeholder='Enter The Name' value={this.state.name} 
            onChange ={this.handleInputChange}/>
          </div>

          <div className ='form-group' style={{marginBottom:'15px'}}>
            <lable  style={{marginBottom:'5px'}}>Email</lable>
            <input type='email' className='form-control' name='email' placeholder='Enter The Email' value={this.state.email} 
            onChange ={this.handleInputChange}/>
          </div>

          <div className ='form-group' style={{marginBottom:'15px'}}>
            <lable  style={{marginBottom:'5px'}}>Password</lable>
            <input type='text' className='form-control' name='status' placeholder='Enter The Status' value={this.state.status} 
            onChange ={this.handleInputChange}/>
          </div>

          <button className ="btn btn-success" type='submit' style ={{marginTop:'15px'}} onClick={this.onSubmit}>
            <i className="far fa-check-square"></i>
            &nbsp; save
          </button>
       
        </form>
      </div>
      
    )
  }
}
