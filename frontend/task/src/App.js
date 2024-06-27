import React from 'react'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Login from './components/registration/Login.js'
import Forgot from './components/registration/Forgot.js';
import Home from './components/Home.js'
import AddTask from './components/tasks/Add.js';
import TaskDetails from './components/tasks/TaskDetails.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/homepage",
    element: <Home />,
  },
  {
    path: "/fgtpwd",
    element: <Forgot />,
  },
  {
    path: "/addTask",
    element: <AddTask />
  },
  {
    path:"/tasks/:id",
    element: <TaskDetails/>
  }
]);
export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
};
