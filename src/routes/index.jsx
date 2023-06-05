import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../pages/home/Home";
import MyTask from "../pages/myTask/MyTask";
import AddTask from "../pages/AddTask/AddTask";
import Completed from "../pages/completed/Completed";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import TaskDetails from "../pages/taskDetails/taskDetails";
import Update from "../pages/update/Update";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      }, ,
      {
        path: '/addTask',
        element: <AddTask></AddTask>
      },
      {
        path: '/myTasks',
        element: <MyTask></MyTask>
      },
      {
        path: '/completed',
        element: <Completed></Completed>
      },
      {
        path: '/signIn',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/taskDetails/:id',
        element: <TaskDetails></TaskDetails>,
        loader: ({ params }) => fetch(`http://localhost:5000/myTask/${params.id}`)
      },
      {
        path: '/myTasks/edit/:id',
        element: <Update></Update>,
        loader: ({ params }) => fetch(`http://localhost:5000/myTask/${params.id}`)
      }
    ]
  }
]);

export default router;