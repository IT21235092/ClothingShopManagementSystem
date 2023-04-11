import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const  EditPeople = () => {
  const { id } = useParams();

  const [state, setState] = useState({
    firstname: '',
    lastname: '',
    telephone: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/accounts/${id}`).then((res) => {
      if (res.data.success) {
        setState({
            firstname: res.data.post.firstname,
            lastname: res.data.post.lastname,
            telephone: res.data.post.telephone,
            email: res.data.post.email,
            address: res.data.post.address,
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

    const { firstname, lastname, telephone,email,address } = state;

    if (!firstname|| !lastname || !telephone|| !email|| !address) {
      alert('Please fill in all fields');
      return;
    }

    const data = {
        firstname: firstname,
        lastname: lastname,
        telephone: telephone,
        email: email,
        address: address,
    };

    axios.put(`http://localhost:8000/accounts/update/${id}`, data).then((res) => {
      if (res.data.success) {
        alert('Post updated successfully');
        setState({
            firstname: '',
            lastname: '',
            telephone: '',
            email: '',
            address: '',
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
            name='firstname'
            placeholder='Enter First Name'
            value={state.firstname}
            onChange={handleInputChange}
          />
          <div id='emailHelp' className='form-text'></div>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Last Name</label>
          <input
            type='text'
            className='form-control'
            name='lastname'
            placeholder='Enter Last Name'
            value={state.lastname}
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
        <div className='mb-3'>
          <label className='form-label'>Telephone</label>
          <input
            type='number'
            className='form-control'
            name='telephone'
            placeholder='Enter Telephone'
            value={state.telephone}
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

        <button className='btn btn-success' type='submit' onClick={onSubmit}>
          <i className='far fa-check-square'></i>&nbsp; Update
        </button>
      </form>
    </div>
  );
};

export default EditPeople;