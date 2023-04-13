import { NavLink } from 'react-router-dom';
import React, { Component } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import '../App.css'
import SideNavBar from './SideNavBar';


export default class Employee extends Component {



  constructor(props){
    super(props);

    this.state ={

      dashSchema:[]
    };
  }

  componentDidMount(){
    this.retrievePosts();
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
        <SideNavBar/>

          
        </div>
        
      </div>

      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="chartjs-size-monitor">
      <div class="card text-white bg-primary mb-3" id='card'>
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Primary card title</h5>
    <p class="card-text">Some quick example [.. truncated content ..]</p>
  </div>

  
</div>

<div class="card text-white bg-primary mb-3" id='card'>
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Primary card title</h5>
    <p class="card-text">Some quick example [.. truncated content ..]</p>
  </div>

  
</div>

<div class="card text-white bg-primary mb-3" id='card'>
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Primary card title</h5>
    <p class="card-text">Some quick example [.. truncated content ..]</p>
  </div>

  
</div>

        </div>
</main></div>
        
    );
}

}
