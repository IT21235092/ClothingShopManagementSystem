import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

export default class NavBar extends Component {

  constructor(props){
    super(props);

    this.state ={

      userData: "",
      
    };
  }

  componentDidMount(){
    
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
        this.setState({userData: data.data})
      });
        
  }

  logOut = () => {

    window.localStorage.clear();
    window.location.href ='./';
  };
  
  render() {
    return (
      <nav className="navbar navbar-expand-lg" id="navColour">
        <div id='logo'><img src={require('../images/LogoCrud.png')}/></div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Support
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                My Account
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                id="navbarDropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                {this.state.userData.user}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="/userProfile">
                  Profile
                </a>
                <a className="dropdown-item" href="#" onClick={this.logOut}>
                  Log Out
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
