import { NavLink } from 'react-router-dom';
import React, { Component } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import '../App.css'
import Profile from './Profile';
import Home from './Home';
import UserProfile from './UserProfile';

export default class Dashboard extends Component {
  constructor(props){
    super(props);

    this.state ={

      userData: "",
      userSchema:[],
      admin: false,
      vendor: false,
      userType:"",
  

    };
  }

  componentDidMount(){
    this.retrievePosts();
    const { userType } = this.state;
    fetch(`http://localhost:8000/userData`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({

        userType,

        

       token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if(data.data.userType == "Admin"){
          this.setState({ admin: true });
          this.setState({ vendor: false });
          
        }else  if(data.data.userType == "Vendor"){
          this.setState({ vendor: true });
          this.setState({ admin: false });
          
        }
        this.setState({userData: data.data});
        if(data.data == 'token expired'){
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href ='./';
        }
      });
        
  }

  
  retrievePosts(){

    axios.get("http://localhost:8000/accounts").then(res =>{
      if(res.data.success){

        this.setState({
          userSchema:res.data.userDetails
        });

        console.log(this.state.posts)
      }
  });

  }

  render() {
    return (
       this.state.admin?(
        <div>

<div className="container-fluid mb-5">
  <div className="row">

  <NavBar/>
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block sidebar-expand-lg" 
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
            <NavLink className="nav-link" to="/profile" id='dashtxt'>
              
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
        <table className="table tablr-hover" style={{marginTop:'20px'}}>
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Tele-phone</th>
              <th scope="col">User Type</th>

              
            </tr>
          </thead>
          {this.state.userSchema.map((userSchema,index) =>(
          <tbody>
            <tr key={index}>
              <td scope="row"><a href={`/userData/${userSchema._id}`} style={{textDecoration:'none'}}>{index+1}</a></td>
              <td>{userSchema.firstname}</td>
              <td>{userSchema.lastname}</td>
              <td>{userSchema.email}</td>
              <td>{userSchema.address}</td>
              <td>{userSchema.telephone}</td>
              <td>{userSchema.userType}</td>
             
              <td>
       
           
          </td>
            </tr>
           
          </tbody>
))}
        </table>
        
      </div>
    </main>

    </div>
    </div>
    </div>
      ) : (
        
         <Profile userData={this.state.userData} />

      ) && this.state.vendor ?(
        <UserProfile userData={this.state.userData}/> 
      ) : (

        <Profile userData={this.state.userData} />
      )
    );
  }
}
