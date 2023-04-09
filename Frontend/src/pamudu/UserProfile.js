import React, { Component } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import NavBar from './NavBar';

export default class UserProfile extends Component{

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

    render(){
    
  return (
    <div>
    <NavBar/>
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  <MDBTypography tag="h5">Marie Horwitz</MDBTypography>
                  <MDBCardText>Web Designer</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">User Profile</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="4" className="mb-3">
                        <MDBTypography tag="h6">User Name</MDBTypography>  
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                      <MDBCardText className="text-muted">{this.state.userData.user}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="4" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>  
                      </MDBCol>
                      <MDBCol size="7" className="mb-3">
                      <MDBCardText className="text-muted">{this.state.userData.email}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="4" className="mb-3">
                        <MDBTypography tag="h6">First Name</MDBTypography>  
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                      <MDBCardText className="text-muted">{this.state.userData.firstname}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="pt-1">
                      <MDBCol size="4" className="mb-3">
                        <MDBTypography tag="h6">Last Name</MDBTypography>  
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                      <MDBCardText className="text-muted">{this.state.userData.lastname}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="pt-1">
                      <MDBCol size="4" className="mb-3">
                        <MDBTypography tag="h6">Tele-Phone</MDBTypography>  
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                      <MDBCardText className="text-muted">{this.state.userData.telephone}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="pt-1">
                      <MDBCol size="4" className="mb-3">
                        <MDBTypography tag="h6">Address</MDBTypography>  
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                      <MDBCardText className="text-muted">{this.state.userData.address}</MDBCardText>
                      </MDBCol>
                    </MDBRow>


                    <div className="d-flex justify-content-start">
                      <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </div>
  );
}
}