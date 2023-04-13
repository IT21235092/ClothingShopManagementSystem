import React from 'react'
import { NavLink } from 'react-router-dom';
import '../App.css';


export default function SideNavBar() {
  return (
    <div className="container-fluid mb-5">
        <div className="row"> <nav
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
  </nav></div></div>
  )
}
