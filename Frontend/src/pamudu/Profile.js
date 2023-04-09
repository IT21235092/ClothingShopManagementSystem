import { NavLink } from 'react-router-dom';
import React, { Component } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import '../App.css'


export default class Profile extends Component {

  constructor(props){
    super(props);

    this.state ={
      userData: "",
      dashSchema:[],
    };
  }

  componentDidMount(){
    this.retrievePosts();
    fetch(`http://localhost:8000/userData`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
       token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
       
        this.setState({userData: data.data});
        if(data.data == 'token expired'){
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href ='./';
        }
      });
  }

  retrievePosts(){
    axios.get("http://localhost:8000/emp").then(res =>{
      if(res.data.success){
        this.setState({
          dashSchema:res.data.existingPosts
        });
        console.log(this.state.posts)
      }
    });
  }

  onDelete = (id) =>{
    axios.delete(`http://localhost:8000/emp/delete/${id}`).then((res) =>{
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
    axios.get("http://localhost:8000/emp").then(res =>{
      if(res.data.success){
        this.filterData(res.data.existingPosts,searchKey)
      }
    })
  }
 


  render() {

    return (
      <div>
          
      <div className="container-fluid mb-5">
  <div className="row">

  <NavBar/>
   

    <main className="col-md-9 m-sm-auto col-lg-10 px-md-4">
      <div className="chartjs-size-monitor">
        <div className="chartjs-size-monitor-expand">
          <div className=""></div>
        </div>
        <div className="chartjs-size-monitor-shrink">
          <div className=""></div>
        </div>
      </div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
            >
              Share
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
            >
              Export
            </button>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary dropdown-toggle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-calendar"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="18"
                rx="2"
                ry="2"
              ></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            This week
          </button>
        </div>
      </div>

      <h2>Employee Details</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Address</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          {this.state.dashSchema.map((dashSchema,index) =>(
          <tbody>
            <tr key={index}>
              <td scope="row"><a href={`/emp/${dashSchema._id}`} style={{textDecoration:'none'}}>{index+1}</a></td>
              <td>{dashSchema.firstName}</td>
              <td>{dashSchema.lastName}</td>
              <td>{dashSchema.address}</td>
              <td>{dashSchema.email}</td>
              <td>
           <a className="btn btn-warning mt-2 rounded-pill" href={`/editemp/${dashSchema._id}`}>
            <i className="fas fa-edit"></i>&nbsp;Edit
           </a>
           &nbsp;
           <a className="btn btn-danger mt-2 rounded-pill" href="#" onClick ={()=>this.onDelete(dashSchema._id)}>
            <i className="far fa-trash-alt"></i>&nbsp;Delete
           </a>
           
          </td>
            </tr>
           
          </tbody>
))}
        </table>
        <button className ="btn btn-primary  mt-4 rounded-pill"><a href="/addD" style ={{textDecoration: 'none' ,color : 'white'}}>New Employee</a></button>
 
      </div>
    </main>
  </div>
</div>
  </div>
       
    );
}

}
