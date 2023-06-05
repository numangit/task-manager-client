import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FcInfo } from 'react-icons/fc';
import { ThreeDots } from 'react-loader-spinner';

const AddTask = () => {
  const { user } = useContext(AuthContext);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //upload image to third party hosting service
  const imageAPIKey = import.meta.env.VITE_imgbb_key;

  //function to handle form submit  
  const handleAddTask = data => {
    // console.log(data)
    setLoading(true)
    //get image data from form and upload to image bb
    const image = data.taskImage[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imageAPIKey}`
    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(imgData => {
        //sending the data from form to end point to save the data in data base
        if (imgData.success) {
          // console.log(imgData.data.url);
          const taskDetails = {
            taskImage: imgData.data.url,
            taskName: data.taskName,
            taskDescription: data.taskDescription,
            userEmail: user.email,
            completed: false,
            postedDate: new Date()
          }
          // console.log(taskDetails);
          // save task information to the database
          fetch('http://localhost:5000/myTasks', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(taskDetails)
          })
            .then(res => res.json())
            .then(result => {
              // console.log(result);
              setLoading(false);
              toast.success("Task added successfully");
              navigate('/my-tasks');
            })
        }
      })
  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='w-full lg:w-4/5'>

        <div className=''>
          <h1 className='text-2xl text-center mb-6'>Hey <span className='text-amber-500 font-semibold'>{user?.displayName}</span>, add Your task here!</h1>
          <div className="shadow-lg p-4 lg:p-8 mx-1 lg:mx-auto w-full lg:w-5/6 rounded-xl my-2 lg:my-5 border text-dark bg-white">
            <h2 className="text-xl text-start font-semibold ">
              <span className='flex items-center'><FcInfo className='mx-2 text-lg' /> Please fill up the form</span>
            </h2>
            <div className="divider my-1"></div>
            <form onSubmit={handleSubmit(handleAddTask)}>

              {/* name and image  */}
              <div className="grid grid-cols-2 gap-5 my-3">
                <div className="form-control w-full flex flex-wrap">
                  <div className='w-full'>
                    <label htmlFor="small-input" className="block mb-2 text-sm font-medium w-1/2 text-gray-900 dark:text-white">Task Name</label>
                    <input
                      {...register("taskName", { required: "task name is required" })}
                      type="text" id="small-input" className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  {errors.taskName && <p className="text-red-500 text-xs" role="alert">{errors.taskName?.message}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload Photo</label>
                  <input
                    {...register("taskImage", { required: "Photo is Required" })}
                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" required />
                  {errors.taskImage && <p className="text-red-500 text-xs" role="alert">{errors.taskImage?.message}</p>}
                </div>
              </div>
              {/* description */}
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Description</label>
              <textarea
                {...register("taskDescription", { required: "Description must be filled" })}
                id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Task description">

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
    </div>
  );
};

export default AddTask;