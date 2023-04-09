import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();

  const [state, setState] = useState({
    topic: '',
    description: '',
    postCategory: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/post/${id}`).then((res) => {
      if (res.data.success) {
        setState({
          topic: res.data.post.topic,
          description: res.data.post.description,
          postCategory: res.data.post.postCategory,
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

    const { topic, description, postCategory } = state;

    if (!topic || !description || !postCategory) {
      alert('Please fill in all fields');
      return;
    }

    const data = {
      topic: topic,
      description: description,
      postCategory: postCategory,
    };

    axios.put(`http://localhost:8000/post/update/${id}`, data).then((res) => {
      if (res.data.success) {
        alert('Post updated successfully');
        setState({
          topic: '',
          description: '',
          postCategory: '',
        });
      }
    });
  };

  return (
    <div className='col-md-8 mt-4 mx-auto'>
      <h1 className='h3 mb-3 font-weight-normal'>Edit Post</h1>
      <form className='needs-validation' noValidate>
        <div className='form-group' style={{ marginBottom: '15px' }}>
          <label className='form-label'>Topic</label>
          <input
            type='text'
            className='form-control'
            name='topic'
            placeholder='Enter Topic'
            value={state.topic}
            onChange={handleInputChange}
          />
          <div id='emailHelp' className='form-text'></div>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Description</label>
          <input
            type='text'
            className='form-control'
            name='description'
            placeholder='Enter Description'
            value={state.description}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Category</label>
          <input
            type='text'
            className='form-control'
            name='postCategory'
            placeholder='Enter Category'
            value={state.postCategory}
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

export default EditPost;
