import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';
import '../../css/Home.module.css'

const TaskDetails = () => {
    const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const {id} = useParams();
  useEffect(() => {
    axios.post(`http://localhost:5000/taskget`,{token:localStorage.getItem('token'),id:id})
      .then(response => setTask(response.data))
      .catch(error => {
        console.error(error);
        navigate('/homepage');
  })
  }, [navigate,id]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const temp = { title:task.title, description:task.description,token:localStorage.getItem('token'),id:id };
      axios.post(`http://localhost:5000/taskupdate/`, temp)
        .then(() => navigate('./'))
        .catch(error => console.error(error));
  };

  

  if (!task){
    return (<h6>Loading...</h6>);
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" value={task.title} onChange={(e) => setTask({...task,title:e.target.value})} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={task.description} onChange={(e) => setTask({...task,description:e.target.value})} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
    </div>
  );
};

export default TaskDetails;
