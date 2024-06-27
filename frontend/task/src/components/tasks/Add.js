import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useNavigate, useParams } from 'react-router-dom';
import './../../css/Home.module.css'

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/tasks/${id}`)
        .then(response => {
          setTitle(response.data.title);
          setDescription(response.data.description);
        })
        .catch(error => console.error(error));
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const task = { title, description };
    if (id) {
      axios.put(`http://localhost:5000/tasks/${id}`, task)
        .then(() => navigate('./'))
        .catch(error => console.error(error));
    } else {
      axios.post('http://localhost:5000/tasks', task)
        .then(() => navigate('../'))
        .catch(error => console.error(error));
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{id ? 'Edit Task' : 'Add Task'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddTask;
