import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './../css/Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const logoutUser = () => {
    localStorage.removeItem('token');
    navigate('../');
  };

  useEffect(() => {
    axios.post('http://localhost:5000/tasks',{token:localStorage.getItem('token')})
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  const deleteTask = (ids) => {
    axios.post(`http://localhost:5000/taskdel/`,{token:localStorage.getItem('token'),id:ids})
      .then(() => setTasks(tasks.filter(task => task.id !== ids)))
      .catch(error => console.error(error));
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Task List</h1>
        <button className="btn btn-outline-secondary" onClick={logoutUser}>Logout</button>
      </div>
      <Link to="/addTask" className="btn btn-primary mb-4">Add Task</Link>
      <ul className="list-group">
        {tasks.map(task => (
          <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
            <Link to={`/tasks/${task._id}`} className="text-decoration-none">{task.title}</Link>
            <button className="btn btn-danger" onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
