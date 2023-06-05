import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { GrEdit } from 'react-icons/gr';
import { AiFillDelete } from 'react-icons/ai';
import { CgDetailsMore } from 'react-icons/cg';
import { BsFillHandThumbsUpFill, BsFillHandThumbsDownFill } from 'react-icons/bs';
import { GoCheck } from 'react-icons/go';

const MyTask = () => {
  const { user } = useContext(AuthContext);

  //api to get tasks by user email
  const { data: myTasks = [], isLoading, refetch } = useQuery({
    queryKey: ['myTasks', user?.email],
    queryFn: async () => {
      const res = await fetch(`https://task-manager-server-sandy.vercel.app/myTasks?email=${user?.email}`);
      const data = await res.json();
      // console.log(data)
      return data;
    }
  });

  console.log(myTasks);
  //function to complete task
  const handleTaskComplete = (id) => {
    fetch(`https://task-manager-server-sandy.vercel.app/myTasks/completed/${id}`, {
      method: 'PUT',
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success('Congratulations, Task Completed!')
          refetch();
        }
      })
  };

  //function to delete task
  const handleDeleteTask = id => {
    fetch(`https://task-manager-server-sandy.vercel.app/myTasks/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success("Task deleted successfully")
        }
      })
  };

  return (
    <div className='mt-20 lg:h-screen '>
      <div>
        {
          (myTasks?.length > 0 && !isLoading)
            ? <h1 className='text-2xl text-center p-4'>
              <span className='text-amber-500 font-semibold'>Manage</span> your
              {
                myTasks?.length > 0
                  ? " tasks."
                  : " task."
              }
            </h1>
            : <div className='w-full'>
              {/* <div className='w-4/5 lg:w-1/4 mx-auto lg:my-0 lg:py-0 flex items-center justify-center'>
                <p className="text-center font-semibold">Loading..</p>
              </div> */}
              <h1 className="font-semibold text-slate-400 text-xl text-center my-2">
                You have not added any task.
              </h1>
              <div className="flex justify-center text-center w-full">
                <Link to="/add-task" className="mx-auto w-full">
                  <button type="button"
                    className="mx-auto text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2">Add Task</button>
                </Link>
              </div>
            </div>
        }

        {/* card */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 p-5 lg:p-10'>
          {
            myTasks?.map(task =>
              <div key={task?._id} className="max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 relative">
                {/* name and description */}
                <div className='p-3 text-left'>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task?.taskName}</h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {task?.taskDescription}
                  </p>
                </div>
                <div className='flex justify-end my-1 absolute -top-4 right-0'>
                  {
                    task?.completed
                      ? <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900 flex items-center">
                        <BsFillHandThumbsUpFill />&#160;Completed
                      </span>
                      : <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900 flex items-center">
                        <BsFillHandThumbsDownFill />&#160;Not Complete
                      </span>
                  }
                </div>
                {/* buttons */}
                <div className="inline-flex justify-center w-full " role="group">
                  <Link to={`/task-details/${task?._id}`}>
                    <button type="button" className=" py-2 px-2 text-sm font-semibold text-gray-600 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-500 focus:z-1 focus:text-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:text-white flex items-center">
                      <CgDetailsMore />&#160;Details
                    </button>
                  </Link>
                  <Link to="/completed">
                    <button
                      onClick={() => handleTaskComplete(task._id)}
                      type="button" className=" py-2 px-2 text-sm font-semibold text-gray-600 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-green-500 focus:z-1 focus:text-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:text-white flex items-center">
                      <GoCheck />&#160;complete
                    </button>
                  </Link>
                  <Link to={`/my-tasks/edit/${task?._id}`}>
                    <button type="button" className=" py-2 px-2 text-sm font-semibold text-gray-600 bg-white border-l border-t border-b border-gray-200 hover:bg-gray-100 hover:text-orange-500 focus:z-10 focus:text-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:text-white flex items-center">
                      <GrEdit />&#160;Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    type="button" className=" py-2 px-2 text-sm font-semibold text-gray-600 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-red-500 focus:z-10 focus:text-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:text-white flex items-center">
                    <AiFillDelete />&#160;Delete
                  </button>
                </div>
              </div>)
          }
        </div>
      </div>
    </div>
  );
};

export default MyTask;