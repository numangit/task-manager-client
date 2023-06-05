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
        path: '/add-task',
        element: <AddTask></AddTask>
      },
      {
        path: '/my-tasks',
        element: <MyTask></MyTask>
      },
      {
        path: '/completed',
        element: <Completed></Completed>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/task-details/:id',
        element: <TaskDetails></TaskDetails>,
        loader: ({ params }) => fetch(`https://task-manager-server-sandy.vercel.app/myTasks/${params.id}`)
      },
      {
        path: '/my-tasks/edit/:id',
        element: <Update></Update>,
        loader: ({ params }) => fetch(`https://task-manager-server-sandy.vercel.app/myTasks/${params.id}`)
      }
    ]
  }
]);

export default router;