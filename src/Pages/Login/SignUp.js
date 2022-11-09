import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../Hooks/useToken';
import Loading from '../Shared/Loading';

const SignUp = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        simpleUser,
        simpleLoading,
        simpleError,
      ] = useCreateUserWithEmailAndPassword(auth);
      const navigate = useNavigate();
      const [updateProfile, updating,  updateError] = useUpdateProfile(auth);
      const [token] = useToken(user || simpleUser);

   
  
    let signInErrorMessage;
    if( loading || simpleLoading ||updating){
     return <Loading></Loading>
    }
    
    if(error|| simpleError|| updateError){
      signInErrorMessage = <small className='text-red-500'>{error?.message || simpleError?.message}</small>
    }
    
  
    if (token) {
      
      navigate('/appointment');
    }
  
    const onSubmit = async(data) => {
      
    await  createUserWithEmailAndPassword(data.email,data.password);
      await updateProfile({displayName: data.name });
      console.log('update done');
      
      
  
    };
    return (
        <div className='flex  min-h-screen justify-center items-center'>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-xl font-bold">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name</span>
               
              </label>
              <input 
                 type="name" 
                 placeholder="Your Name" 
                 className="input input-bordered w-full max-w-xs" 
              {...register("name", { 
                required:{
                  value: true,
                  message:'Name is required'
                }
              })}
           

              />
              <label className="label">
              {errors.name?.type === 'required' &&<span className="label-text-alt text-red-500">{errors.name.message}</span>}
              {errors.name?.type === 'pattern' &&<span className="label-text-alt text-red-500">{errors.name.message}</span>}
                
              
              </label>
            </div>
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
        


           

            <input className='btn w-full max-w-xs text-white' type="submit" value="Sign Up" />
          </form>
          
        <p> <small>Already Have an Account<Link className='text-primary' to='/login'>Please Login</Link></small></p>
         
          <div className="divider">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline ">Continue With Google</button>


        </div>
      </div>
    </div>
    );
};

export default SignUp;