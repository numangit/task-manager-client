import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';
import { useLoaderData, useNavigate } from 'react-router-dom';

const Update = () => {
  const taskDetails = useLoaderData();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  //function to handle form submit  
  const handleAddTask = data => {
    // console.log(data)
    setLoading(true);
    fetch(`https://task-manager-server-sandy.vercel.app/myTasks/${taskDetails._id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          setLoading(false);
          toast.success("Task updated successfully")
          navigate('/my-tasks');
        }
      })

  }

  return (
    <div className='lg:h-screen flex justify-center items-center'>

      <div className='w-full lg:w-4/5'>
        <h1 className='text-2xl text-center my-3'>
          <span className='text-amber-500 font-semibold'>Update</span> task details.
        </h1>
        <div className="shadow-lg p-4 lg:p-8 mx-1 lg:mx-auto w-full lg:w-5/6 rounded-xl my-2 lg:my-5 border text-dark bg-white">

          <form onSubmit={handleSubmit(handleAddTask)}>

            {/* name */}
            <div className="grid grid-cols-1 gap-5 my-3">
              <div className="form-control w-full flex flex-wrap">
                <div className='w-full'>
                  <label htmlFor="small-input" className="block mb-2 text-sm font-medium w-full text-gray-900 dark:text-white">Task Name</label>
                  <input
                    {...register("taskName", { required: "task name is required" })}
                    type="text" id="small-input"
                    defaultValue={taskDetails?.taskName}
                    className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                {errors.taskName && <p className="text-red-500 text-xs" role="alert">{errors.taskName?.message}</p>}
              </div>
            </div>

            {/* description */}
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Description</label>
            <textarea
              {...register("taskDescription", { required: "Description must be filled" })}
              defaultValue={taskDetails?.taskDescription}
              id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >

            </textarea>
            {errors.taskDescription && <p className="text-red-500 text-xs" role="alert">{errors.taskDescription?.message}</p>}

            {
              loading ?
                <button className='mt-3 w-full bg-black text-white p-2 rounded-md flex justify-center items-center' type="submit">

                  <ThreeDots
                    height="30"
                    width="60"
                    radius="9"
                    color="#2196f3"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                  <span className='mx-1'>Processing</span>
                </button>
                :
                <input className='mt-3 w-full bg-black text-white p-2 rounded-md' value="Add Task" type="submit" />
            }


          </form>

        </div>
      </div>
    </div>
  );
};

export default Update;