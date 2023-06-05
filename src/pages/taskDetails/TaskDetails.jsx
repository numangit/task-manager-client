import { useLoaderData } from "react-router-dom";
import { MdDateRange, MdIncompleteCircle } from 'react-icons/md';
import { BiTime } from 'react-icons/bi';

const TaskDetails = () => {
  const taskDetails = useLoaderData();

  return (
    <div className='mt-20 lg:h-screen p-2'>
      <h1 className='text-2xl text-center my-3'>
        <span className='text-amber-500 font-semibold'>{taskDetails?.taskName}</span> task details.
      </h1>

      <div className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row first-letter:hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 lg:w-4/5 mx-auto">
        <img
          className="m-2 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none lg:rounded-lg"
          src={taskDetails?.taskImage}
          alt="" />
        <div className="flex flex-col justify-between p-4 leading-normal">
          {/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{taskDetails?.taskName}</h5> */}
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 md:flex">
            <p className='font-semibold text-sm'>Description: </p>&nbsp;
            {taskDetails?.taskDescription}
          </p>
          <div className='md:flex justify-around'>
            <span className='flex items-center'>
              <span className='font-semibold text-sm'>Posted on:</span>&nbsp;
              {/* < />&#160;Date:{taskDetails?.postedDate} */}
              <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 flex items-center">
                <MdDateRange />&nbsp;{taskDetails?.postedDate?.slice(2, -14)}&nbsp;&nbsp;
              </span>
              <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 flex items-center">
                <BiTime />&nbsp;{taskDetails?.postedDate?.slice(11, -5)}
              </span>
            </span>
            <span className='flex items-center'>
              <MdIncompleteCircle />&#160;<span className='font-semibold text-sm'>Status:</span>&#160;
              {
                taskDetails?.completed
                  ? <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Completed</span>
                  : <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Not Complete</span>
              }
            </span>
          </div>
        </div>
      </div>

    </div >
  );
};

export default TaskDetails;