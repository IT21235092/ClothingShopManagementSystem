import { NavLink } from 'react-router-dom';
import React, { Component } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import '../App.css'
import Profile from './Profile';
import Home from './Home';
import UserProfile from './UserProfile';
import Customer from '../inthi/Customer';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideNavBar from './SideNavBar';


export default class Dashboard extends Component {
  constructor(props){
    super(props);

    this.state ={

      
      userData: "",
      userSchema:[],
      posts:[],
      admin: false,
      employee: false,
      userType:"",
      count: null,
      error: null,
      Tcount: null,
      Terror: null

  

    };
  }

  componentDidMount(){
    const { userId } = this.props;
    this.fetchAccountCount(userId);
    this.fetchTaskCount(userId);
    
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
          this.setState({ employee: false });
          
        }else  if(data.data.userType == "Employee"){
          this.setState({ employee: true });
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

  componentDidUpdate(prevProps) {
    const { userId } = this.props;
    if (userId !== prevProps.userId) {
      this.fetchAccountCount(userId);
      this.fetchTaskCount(userId);
    }
  }

  async fetchAccountCount(userId) {
    try {
      const response = await axios.get(`http://localhost:8000/accounts/count/${userId}`);
      this.setState({ count: response.data.count });
    } catch (error) {
      console.error(error);
      this.setState({ error: 'Server error' });
    }
  }

  async fetchTaskCount(userId) {
    try {
      const response = await axios.get(`http://localhost:8000/post/count/${userId}`);
      this.setState({ Tcount: response.data.count });
    } catch (error) {
      console.error(error);
      this.setState({ Terror: 'Server error' });
    }
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

  onDelete = (id) =>{

    axios.delete(`http://localhost:8000/accounts/delete/${id}`).then((res) =>{
      this.retrievePosts();
    alert("Deleted Successfully");
    
    })
  }

  filterData(userSchema,searchKey){
    
    const result = userSchema.filter((post) =>  
    
    
    post.firstname.includes(searchKey) || post.firstname.toLowerCase().toUpperCase().includes(searchKey)||
    post.lastname.includes(searchKey)|| post.lastname.toLowerCase().toUpperCase().includes(searchKey)||
    post.address.includes(searchKey) || post.address.toLowerCase().toUpperCase().includes(searchKey)||
    post.telephone.toString().includes(searchKey) ||
    post.user.includes(searchKey) || post.user.toLowerCase().toUpperCase().includes(searchKey)||
    post.userType.includes(searchKey) || post.userType.toLowerCase().toUpperCase().includes(searchKey)||
    post.email.toLowerCase().includes(searchKey) || post.email.toLowerCase().toUpperCase().includes(searchKey)

    )

    this.setState({userSchema:result})
  }

  handleSearchArea =(e) => {


    console.timeLog(e.currentTarget.value);
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:8000/accounts").then(res =>{
      if(res.data.success){

        this.filterData(res.data.userDetails,searchKey)
      }
  })

  }

  render() {


    return (
       this.state.admin?(
        <div>

<div className="container-fluid mb-5">
  <div className="row">

  <NavBar/>
  <SideNavBar/>
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

     
     
      <div style={{ display: 'flex' }}>
  <div class="card text-primary bg-outline-primary mt-4" id='card' style={{ marginRight: '10px' }}>
    <div class="card-header">Staff</div>
    <div class="card-body">
      <h5 class="card-title">Employees' Count = {this.state.count} </h5>
      <p class="card-text">
        <div className="progress rounded-circle" style={{ width: '120px', height: '120px' }}>
          <div
            className="progress-bar rounded-circle"
            role="progressbar"
            style={{ width: `${this.state.count * 5}%`, height: '120px', borderRadius: '60px' }}
            aria-valuenow={this.state.count}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <span className="visually-visible">{this.state.count * 5}%</span>
          </div>
        </div>
      </p>
    </div>
  </div>
 
  <div class="card text-primary bg-outline-primary mt-4" id='card' style={{ marginLeft: '30px' }}>
    <div class="card-header">Work</div>
    <div class="card-body">
      <h5 class="card-title">Employee Tasks Count = {this.state.Tcount} </h5>
      <p class="card-text">
        <div className="progress rounded-circle" style={{ width: '120px', height: '120px' }}>
          <div
            className="progress-bar rounded-circle"
            role="progressbar"
            style={{ width: `${this.state.Tcount * 5}%`, height: '120px', borderRadius: '60px' }}
            aria-valuenow={this.state.Tcount}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <span className="visually-visible">{this.state.Tcount * 5}%</span>
          </div>
        </div>
      </p>
    </div>
  </div>
</div>

    

<br/>
      <input className='form-control' type = "search" placeholder='Search' name ="searchQuery" 
            onChange={this.handleSearchArea}>

            </input>
            <br/>
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
              <td><td>

              <div class="dropdown">
  <a class=" dropdown-toggle"  role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
    
  </a>

  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <li><a class="dropdown-item" href={`/editpeople/${userSchema._id}`}>Edit</a></li>
    <li><a class="dropdown-item" href="#" onClick ={()=>this.onDelete(userSchema._id)}>Delete</a></li>
    <li><a class="dropdown-item" href={`/userProfilePer/${userSchema._id}`}>ViewProfile</a></li>
  </ul>
</div>
                
              </td>
       
           
          </td>
            </tr>
           
          </tbody>
))}
        </table>

        <button className ="btn btn-success mt-2 rounded-pill"><a href="/addP" style ={{textDecoration: 'none' ,color : 'white'}}>Add New User</a></button>
        
      </div>
    </main>

    </div>
    </div>
    </div>
      ) : (
        
         <Customer userData={this.state.userData} />

      ) && this.state.employee ?(
        <UserProfile userData={this.state.userData}/> 
      ) : (

        <Customer userData={this.state.userData} />
      )
    );
  }
}
