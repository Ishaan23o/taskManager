import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const TaskDetails = () => {
  const [task, setTask] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/tasks/${id}`)
      .then(response => setTask(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!task) return <div>Loading...</div>;

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <Link to={`/edit/${task.id}`}>Edit</Link>
      <Link to="/">Back to Task List</Link>
    </div>
  );
};

export default TaskDetails;
