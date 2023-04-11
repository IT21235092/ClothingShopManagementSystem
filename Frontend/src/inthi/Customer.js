/* eslint-disable no-template-curly-in-string */ 
/* eslint-disable jsx-a11y/anchor-is-valid */ 
import { NavLink } from 'react-router-dom';
import React, { Component } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from '../pamudu/NavBar';




export default class Customer extends Component {



  constructor(props){
    super(props);

    this.state ={

     Cus:[]
    };
  }

  componentDidMount(){
    this.retrievePosts();
  }

  retrievePosts(){

    axios.get("http://localhost:8000/cus").then(res =>{
      if(res.data.success){

        this.setState({
          Cus:res.data.existingPosts
        });

        console.log(this.state.Cus)
      }
  });

  }

  onDelete = (id) =>{

    axios.delete(`http://localhost:8000/cus/delete/${id}`).then((res) =>{
      this.retrievePosts();
    alert("Deleted Successfully");
    
    })
  }

  filterData(Cus,searchKey){

    const result = Cus.filter((post) =>
    
    post.name.toLowerCase().includes(searchKey) ||
    post.email.toLowerCase().includes(searchKey)||
    post.status.toLowerCase().includes(searchKey)

    )

    this.setState({Cus:result})
  }

  handleSearchArea =(e) => {


    console.timeLog(e.currentTarget.value);
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8000/cus").then(res =>{
      if(res.data.success){

        this.filterData(res.data.existingPosts,searchKey)
      }
  })

  }

  render() {
    return (

      
      <div className="container-fluid mb-5">
        <div className="row">

       
       <NavBar/>
       
          <main className="col-md-9 m-sm-auto col-lg-10 px-md-4">
        <div className="col-lg-15 mt-2 mb-2" >
          <h4>All Posts</h4>
          
            <input className='form-control' type = "search" placeholder='Search' name ="searchQuery" 
            onChange={this.handleSearchArea}>

            </input>
          

        <table class = "table tablr-hover" style={{marginTop:'40px'}}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
              
            </tr>
          </thead>
          <tbody>
            {this.state.Cus.map((Cus,index) =>(
              <tr key={index}>
                
                <th scope="row">{index+1}</th>
                <td><a href={`/cus/${Cus._id}`} style={{textDecoration:'none'}}>{Cus.name}</a></td>
                <td>{Cus.email}</td>
                <td>{Cus.status}</td>
                <td>
                 <a className="btn btn-warning" href={`/CusEdit/${Cus._id}`}>
                  <i className="fas fa-edit"></i>&nbsp;Edit
                 </a>
                 &nbsp;
                 <a className="btn btn-danger" href="#" onClick ={()=>this.onDelete(Cus._id)}>
                  <i className="far fa-trash-alt"></i>&nbsp;Delete
                 </a>
                 
                </td>
              </tr>
            ))}

          </tbody>
        </table>

        <button className ="btn btn-success"><a href="/CusAdd" style ={{textDecoration: 'none' ,color : 'white'}}>Create New Post</a></button>
       
        </div>
        </main>
        </div>
        </div>
    )
  }
}
