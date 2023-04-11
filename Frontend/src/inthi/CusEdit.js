import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CusEdit = () => {
  const { id } = useParams();

  const [state, setState] = useState({
    name:"",
    email:"",
    status:""

  });

  useEffect(() => {
    axios.get(`http://localhost:8000/cus/${id}`).then((res) => {
      if (res.data.success) {
        setState({
          name: res.data.post.name,
         email: res.data.post.email,
          status: res.data.post.status,
          
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

    const { name,  email, status } = state;

    if (!name || !email|| !status ) {
      alert('Please fill in all fields');
      return;
    }

    const data = {
      name: name,
      email: email,
      status: status,

    };

    axios.put(`http://localhost:8000/cus/update/${id}`, data).then((res) => {
      if (res.data.success) {
        alert('Post updated successfully');
        setState({
      
    name: '',
    email: '',
    status: '',
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
            name='name'
            placeholder='Enter the Name'
            value={state.name}
            onChange={handleInputChange}
          />
          <div id='emailHelp' className='form-text'></div>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Last Name</label>
          <input
            type='text'
            className='form-control'
            name='email'
            placeholder='Enter Email'
            value={state.email}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Address</label>
          <input
            type='text'
            className='form-control'
            name='status'
            placeholder='Enter Status'
            value={state.status}
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

export default CusEdit;
