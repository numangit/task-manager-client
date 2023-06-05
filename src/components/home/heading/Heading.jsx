import { Link } from "react-router-dom";

const Heading = () => {
  return (
    <div className=" container mx-auto mt-16 lg:h-full bg-cover 
    bg-[url('https://images.pexels.com/photos/1548111/pexels-photo-1548111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
      <div className='md:w-5/6 mx-auto py-32 text-center'>
        <h1 className='text-2xl md:text-6xl mb-6 text-slate-50 font-semibold'>Organize your work and projects with our organization tools</h1>
        <div>
          <h1 className='text-lg md:text-2xl mt-1 text-slate-50'>Put all your plans and projects in one place so you can work productively without the chaos and confusion.</h1>
        </div>
        <Link to="/add-task">
          <button type="button" className="text-white bg-gradient-to-br from-orange-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-4 ">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default Heading;