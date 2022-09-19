import React from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../Hooks/useToken';
import { useEffect } from 'react';

const Login = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [
    signInWithEmailAndPassword,
    simpleUser,
    simpleLoading,
    simpleError,
  ] = useSignInWithEmailAndPassword(auth);
  const [token] = useToken(user || simpleUser)
  
 
const navigate = useNavigate();
const location = useLocation();
  let signInErrorMessage;
  let from = location.state?.from?.pathname || "/";
  useEffect(()=>{
   if(token){
    navigate(from, { replace: true});
   }
  },[token, from, navigate])
  if( loading || simpleLoading){
   return <Loading></Loading>
  }
  
  if(error|| simpleError){
    signInErrorMessage = <small className='text-red-500'>{error?.message || simpleError?.message}</small>
  }
  


  const onSubmit = data => {
    console.log(data);
    signInWithEmailAndPassword(data.email,data.password);

  };
  return (
    <div className='flex  h-screen justify-center items-center'>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-xl font-bold">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
               
              </label>
              <input 
                 type="email" 
                 placeholder="Your Email" 
                 className="input input-bordered w-full max-w-xs" 
              {...register("email", { 
                required:{
                  value: true,
                  message:'Email is required'
                },
            pattern:{
              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              message: 'Provide is valid' 
            }
              })}
           

              />
              <label className="label">
              {errors.email?.type === 'required' &&<span className="label-text-alt text-red-500">{errors.email.message}</span>}
              {errors.email?.type === 'pattern' &&<span className="label-text-alt text-red-500">{errors.email.message}</span>}
                
              
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
               
              </label>
              <input 
                 type="password" 
                 placeholder="Your Password" 
                 className="input input-bordered w-full max-w-xs" 
              {...register("password", {     
                required:{
                  value: true,
                  message:'Password is required'
                },
              minlength:{
                value: 6,
                message: ' Must be 6 character or longer' 
              }
              })}
           

              />
              <label className="label">
              {errors.password?.type === 'required' &&<span className="label-text-alt text-red-500">{errors.password.message}</span>}
              {errors.password?.type === 'minlength' &&<span className="label-text-alt text-red-500">{errors.password.message}</span>}
                
              
              </label>
            </div>
            {signInErrorMessage}
        


           

            <input className='btn w-full max-w-xs text-white' type="submit" value="Login" />
          </form>
          
        <p> <small>New to Doctors Portal <Link className='text-primary' to='/signup'>Create New Account</Link></small></p>
         
          <div className="divider">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline ">Continue With Google</button>


        </div>
      </div>
    </div>
  );
};

export default Login;