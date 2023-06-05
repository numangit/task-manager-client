import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImCross } from 'react-icons/im';
import { FaPlus } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { MdNoteAlt } from 'react-icons/md';
import { AuthContext } from '../../context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const Completed = () => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState([]);
  const { register, formState: { errors }, handleSubmit } = useForm();

  //api to get products by user email
  const { data: myTasks = [], isLoading, refetch } = useQuery({
    queryKey: ['myTasks', user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/myTasks?email=${user?.email}`);
      const data = await res.json();
      // console.log(data)
      return data;
    }
  });

  //function to delete task
  const handleDeleteTask = id => {
    fetch(`http://localhost:5000/myTasks/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success("Task deleted successfully")
        }
      })
  }

  //function to handle modal (to be able to send selected task data to modal and to show modal)
  const handleOpenModal = task => {
    setShowModal(true);
    setSelectedTask(task);
  }

  //function to add note (in modal)
  const handleAddNote = data => {
    // console.log(data)
    fetch(`http://localhost:5000/myTasks/note/${selectedTask._id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          setShowModal(false);
          refetch();
          toast.success("Task note added successfully")
        }
      })
  }

  return (
    <div className='mt-20 lg:h-screen '>
      <div>
        {/* {
                    (myTasks?.lenght > 0 && !completeTask && !isLoading) ? */}
        <h1 className='text-2xl text-center p-4'>
          <span className='text-amber-500 font-semibold'>Completed</span>
          {
            myTasks?.length > 0
              ? " tasks."
              : " task."
          }
        </h1>
        {/* show loader  */}
        {
          isLoading && <p className='text-center font-semibold'>Loading...</p>
        }


        {/* card */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 p-5 lg:p-10'>
          {
            myTasks?.map(task =>
              <div key={task?._id}
                className={task?.completed
                  ? "max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
                  : "hidden"}>
                {/* name and description */}
                <div className='p-3 text-left'>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task.taskName}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {task?.taskDescription}
                  </p>
                </div>
                {/* buttons */}
                <div className="inline-flex justify-center w-full " role="group">
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    type="button" className="py-2 px-4 text-sm font-semibold text-gray-600 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-red-500 focus:z-10 focus:ring-2 focus:ring-red-500 focus:text-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-red-500 dark:focus:text-white flex items-center">
                    <AiFillDelete />&#160;Delete
                  </button>
                  <Link to="/myTasks">
                    <button type="button" className="py-2 px-4 text-sm font-semibold text-gray-600 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-orange-500 focus:z-10 focus:ring-2 focus:ring-orange-500 focus:text-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-orange-500 dark:focus:text-white  flex items-center">
                      <ImCross />&#160; Not Complete
                    </button>
                  </Link>
                </div>
                {/* note section  */}
                {
                  task?.taskNote
                    ? <div className="p-2 my-2 text-sm text-indigo-700 bg-indigo-100 rounded-lg dark:bg-indigo-200 dark:text-indigo-800" role="alert">
                      <p className="font-semibold flex items-center mb-1"><MdNoteAlt />&#160;Note:</p>
                      {task?.taskNote}
                    </div>
                    : <div className='flex items-center pt-4'>
                      <div className='hover:bg-slate-50 hover:text-gray-400 hover:shadow-sm bg-gray-200 text-center cursor-pointer rounded-lg w-full mt-auto'>
                        <h1 onClick={() => handleOpenModal(task)}
                          className='text-sm font-semibold hover:text-gray-500 p-4  text-gray-400 flex items-center justify-center'>
                          <FaPlus />&#160;Add Note
                        </h1>
                      </div>
                    </div>
                }
              </div>)
          }
        </div>
      </div>
      {/* modal  */}
      <>

        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-2 mx-auto lg:w-1/2">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                  <div className="relative p-3 flex-auto">

                    <form onSubmit={handleSubmit(handleAddNote)}>
                      <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add your note</label>
                      <textarea
                        {...register("taskNote", { required: "Note must be filled or press 'Cancel'" })}
                        id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""></textarea>
                      {errors.taskNote && <p className="text-red-500 text-xs" role="alert">{errors.taskNote?.message}</p>}
                      <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-indigo-800 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-indigo-800 text-white active:bg-indigo-800 py-2 px-3 text-sm font-medium text-center rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-800 dark:bg-indigo-800 dark:hover:bg-indigo-800 dark:focus:ring-indigo-800"
                          type="Submit"
                        >
                          Add Note
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="backdrop-blur-sm fixed inset-0 z-40 bg-black/25"></div>
          </>
        ) : null}
      </>
    </div>
  );
};

export default Completed;