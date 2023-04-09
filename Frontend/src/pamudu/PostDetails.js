import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/post/${id}`)
      .then((res) => {
        if (res.data.success) {
          setPost(res.data.post);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const { topic, description, postCategory } = post;

  return (
    <div style={{ marginTop: '20px' }}>
      <h4>{topic}</h4>
      <hr />

      <div className='row'>
        <dt className='col-sm-3'>Description</dt>
        <dd className='col-sm-9'>{description}</dd>

        <dt className='col-sm-3'>Post Category</dt>
        <dd className='col-sm-9'>{postCategory}</dd>
      </div>
    </div>
  );
};

export default PostDetails;
