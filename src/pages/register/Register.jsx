import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { createUser, updateUser } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  //scroll at the top after page is rendered
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  //handler to handle register function
  const handleSignUp = data => {
    // console.log(data)
    setRegisterError('');
    createUser(data.email, data.password)
      .then(() => {
        const userInfo = {
          displayName: data.name
        }
        updateUser(userInfo)
          .then(() => {
            // console.log('Profile Updated');
            toast.success('Welcome!');
            navigate(from, { replace: true });
          })
          .catch(error => {
            console.log(error)
          });
      })
      .catch(error => {
        console.log(error)
        setRegisterError(error.message)
      });
  };

  //show and hide password
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className='mt-20 lg:h-screen flex justify-center items-center'>
      <div className="shadow-lg p-10 lg:mx-auto w-full lg:w-96 rounded-xl my-5 lg:my-24 border text-dark">
        <h2 className="text-3xl text-center font-semibold mb-3">Register</h2>
        <p className='text-center text-slate-400'>Join us!</p>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div>
            {registerError && <p className='text-red-600'>{registerError.slice(22, -2)}</p>}
          </div>
          <div className="form-control w-full ">
            <label className="label"><span className="">Name :</span></label>
            <input {...register("name",
              {//name validation and error handling 
                required: "Name is required"
              })}
              type="text" className="input input-bordered w-full " />
            {errors.name && <p className="text-red-500 text-sm" role="alert">{errors.name?.message}</p>}
          </div>
          <div className="form-control w-full ">
            <label className="label"><span className="">Email :</span></label>
            <input {...register("email",
              {//email validation and error handling 
                required: "Email Address is required"
              })}
              type="email" className="input input-bordered w-full" />
            {errors.email && <p className="text-red-500 text-sm" role="alert">{errors.email?.message}</p>}
          </div>
          <div className="form-control w-full">
            <label className="label"><span className="label-text">Password :</span></label>
            <div className='relative'>
              <input {...register("password",
                {//password validations and error handling 
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: 'Password must be 6 characters or longer'
                  }
                })}
                type={passwordShown ? "text" : "password"} className="input input-bordered w-full " />
              <div onClick={togglePassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <AiFillEye
                  className={passwordShown ? 'hidden' : 'block'} />
                <AiFillEyeInvisible
                  className={passwordShown ? 'block' : 'hidden'} />
              </div>
            </div>
            {errors.password && <p className="text-red-500 text-sm" role="alert">{errors.password?.message}</p>}
          </div>
          <input className='btn bg-black text-white rounded-md p-2 w-full mt-3' value="Register" type="submit" />
        </form>
        <p className="text-sm mt-2 text-center">Already have an account? <Link className="underline" to="/login">Log in</Link></p>
      </div>
    </div>
  );
};

export default Register;