/* eslint-disable no-template-curly-in-string */ 
/* eslint-disable jsx-a11y/anchor-is-valid */ 
import { NavLink } from 'react-router-dom';
import React, { Component } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from './NavBar';



export default class Home extends Component {



  constructor(props){
    super(props);

    this.state ={

      posts:[]
    };
  }

  componentDidMount(){
    this.retrievePosts();
  }

  retrievePosts(){

    axios.get("http://localhost:8000/posts").then(res =>{
      if(res.data.success){

        this.setState({
          posts:res.data.existingPosts
        });

        console.log(this.state.posts)
      }
  });

  }

  onDelete = (id) =>{

    axios.delete(`http://localhost:8000/post/delete/${id}`).then((res) =>{
      this.retrievePosts();
    alert("Deleted Successfully");
    
    })
  }

  filterData(posts,searchKey){

    const result = posts.filter((post) =>
    
    post.topic.toLowerCase().includes(searchKey) ||
    post.description.toLowerCase().includes(searchKey)||
    post.postCategory.toLowerCase().includes(searchKey)

    )

    this.setState({posts:result})
  }

  handleSearchArea =(e) => {


    console.timeLog(e.currentTarget.value);
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8000/posts").then(res =>{
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
        <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block sidebar collapse" 
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">

              <li className="nav-item " id='dashw'>
              <form class="form-inline" id='search'> 
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
  </form>
                </li>
                <li className="nav-item " id='dashw'>
                  <NavLink className="nav-link" aria-current="page" to="/emp" id='dashtxt'>
                
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item" id='dashw'>
                  <NavLink className="nav-link" to="/dash" id='dashtxt'>
            
                    Employees
                  </NavLink>
                </li>
                <li className="nav-item" id='dashw'>
                  <NavLink className="nav-link" to="/Home" id='dashtxt'>
                   
                    Tasks
                  </NavLink>
                </li>
                <li className="nav-item" id='dashw'>
                  <NavLink className="nav-link" to="/sss" id='dashtxt'>
                   
                    Leaves
                  </NavLink>
                </li>
                <li className="nav-item" id='dashw'>
                  <NavLink className="nav-link" to="/ssss" id='dashtxt'>
                   
                    Attendance
                  </NavLink>
                </li>
                <li className="nav-item" id='dashw'>
                  <NavLink className="nav-link" to="/fgg" id='dashtxt'>
                    
                    Reports
                  </NavLink>
                </li>
                <li className="nav-item" id='dashw'>
                  <NavLink className="nav-link" to="/ssss" id='dashtxt'>
                   
                    Feedback
                  </NavLink>
                </li>
              </ul>

             
             
            </div>
          </nav>
       
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="col-lg-15 mt-2 mb-2" >
          <h4>All Posts</h4>
          
            <input className='form-control' type = "search" placeholder='Search' name ="searchQuery" 
            onChange={this.handleSearchArea}>

            </input>
          

        <table class = "table tablr-hover" style={{marginTop:'40px'}}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Task</th>
              <th scope="col">Description</th>
              <th scope="col">Task Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts,index) =>(
              <tr key={index}>
                
                <th scope="row">{index+1}</th>
                <td><a href={`/post/${posts._id}`} style={{textDecoration:'none'}}>{posts.topic}</a></td>
                <td>{posts.description}</td>
                <td>{posts.postCategory}</td>
                <td>
                 <a className="btn btn-warning mt-2 rounded-pill" href={`/edit/${posts._id}`}>
                  <i className="fas fa-edit"></i>&nbsp;Edit
                 </a>
                 &nbsp;
                 <a className="btn btn-danger mt-2 rounded-pill" href="#" onClick ={()=>this.onDelete(posts._id)}>
                  <i className="far fa-trash-alt"></i>&nbsp;Delete
                 </a>
                 
                </td>
              </tr>
            ))}

          </tbody>
        </table>

        <button className ="btn btn-success mt-2 rounded-pill"><a href="/add" style ={{textDecoration: 'none' ,color : 'white'}}>Create New Post</a></button>
       
        </div>
        </main>
        </div>
        </div>
    )
  }
}
