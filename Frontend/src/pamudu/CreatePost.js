import React, { Component } from 'react'
import axios from 'axios'

export default class CreatePost extends Component {

  constructor(props){
    super(props);
  this.state={
    topic:"",
    description:"",
    postCategory:""

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

    const {topic,description,postCategory} = this.state;

    const data ={
      topic:topic,
      description:description,
      postCategory:postCategory
    }

    console.log(data)

    axios.post('http://localhost:8000/post/save', data).then((res) =>{

      if(res.data.success){

        this.setState({

          topic:"",
          description:"",
          postCategory:""
      
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
            <lable  style={{marginBottom:'5px'}}>Topic</lable>
            <input type='text' className='form-control' name='topic' placeholder='Enter Topic' value={this.state.topic} 
            onChange ={this.handleInputChange}/>
          </div>

          <div className ='form-group' style={{marginBottom:'15px'}}>
            <lable  style={{marginBottom:'5px'}}>Description</lable>
            <input type='text' className='form-control' name='description' placeholder='Enter Topic' value={this.state.description} 
            onChange ={this.handleInputChange}/>
          </div>

          <div className ='form-group' style={{marginBottom:'15px'}}>
            <lable  style={{marginBottom:'5px'}}>Post Category</lable>
            <input type='text' className='form-control' name='postCategory' placeholder='Enter Post Category' value={this.state.postCategory} 
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
