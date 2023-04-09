import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',

  });

  useEffect(() => {
    axios.get(`http://localhost:8000/emp/${id}`).then((res) => {
      if (res.data.success) {
        setState({
          firstName: res.data.post.firstName,
          lastName: res.data.post.lastName,
          address: res.data.post.address,
          email: res.data.post.email,
        });
      }
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, address, email } = state;

    if (!firstName || !lastName || !address || !email) {
      alert('Please fill in all fields');
      return;
    }

    const data = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      email: email,
    };

    axios.put(`http://localhost:8000/emp/update/${id}`, data).then((res) => {
      if (res.data.success) {
        alert('Post updated successfully');
        setState({
      firstName: '',
    lastName: '',
    address: '',
    email: '',
        });
      }
    });
  };

  return (
    <div className='col-md-8 mt-4 mx-auto'>
      <h1 className='h3 mb-3 font-weight-normal'>Edit Post</h1>
      <form className='needs-validation' noValidate>
        <div className='form-group' style={{ marginBottom: '15px' }}>
          <label className='form-label'>First Name</label>
          <input
            type='text'
            className='form-control'
            name='firstName'
            placeholder='Enter the first name'
            value={state.firstName}
            onChange={handleInputChange}
          />
          <div id='emailHelp' className='form-text'></div>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Last Name</label>
          <input
            type='text'
            className='form-control'
            name='lastName'
            placeholder='Enter the last name'
            value={state.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Address</label>
          <input
            type='text'
            className='form-control'
            name='address'
            placeholder='Enter Address'
            value={state.address}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Email</label>
          <input
            type='text'
            className='form-control'
            name='email'
            placeholder='Enter Email'
            value={state.email}
            onChange={handleInputChange}
          />
        </div>

        <button className='btn btn-success' type='submit' onClick={onSubmit}>
          <i className='far fa-check-square'></i>&nbsp; Update
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
