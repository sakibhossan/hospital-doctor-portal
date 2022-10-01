import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit,reset } = useForm();
    const {data: portal,isLoading} = useQuery('portals', () => fetch('http://localhost:5000/portals').then(res => res.json()));

const imageStorageKey = '2adec9ed4971af8e1ccc343b0fefb503' ;

/**
 * 3 ways to store imges
 * 1.Third party Storage // Free open punlic Storage its ok for practice project
 * 2.Your own Storage in your server(file system)
 * 3.Database:  Mongo Db
 * 
 * YUP: to validate file: Search > Yup validation for react hook form
 * */ 


    const onSubmit = async(data) => {
      
      
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image',image);
        const url =`https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url,{
          method:'POST',
          body: formData

        })
        .then(res=> res.json())
        .then(result=>{
          if(result.success){
            const img = result.data.url;
            const doctor = {
              name: data.name,
              email: data.email,
              spacialty: data.specatialty,
              img: img
            }
            // send to your database
            fetch('http://localhost:5000/doctor',{
              method: 'POST',
              headers:{
                'content-type':'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
              },
              body: JSON.stringify(doctor)
  
            })
            .then(res=>res.json())
            .then(inserted=>{
             if(inserted.insertedId){
              toast.success('Doctors added successfully')
              reset();
             }
             else{
              toast.error('Failed to add the doctor')
             }
            })
          }
          
        
          
        } )
          
          
      
        };
        if(isLoading){
            return <Loading></Loading>
        }
    return (
        <div>
            
            <h2 className='text-2xl'>Add new a Doctor</h2>
            <form onSubmit={handleSubmit(onSubmit)}>


            <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Name</span>
   
  </label>
  <input 
     type="text" 
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
  
    
  
  </label>
  </div>
  {/* close name filed */}


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
  
    
  
  </label>
</div>
{/* close email filed */}

 
  <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">
        specitialty
    </span>
   
  </label>
  <select {...register('specatialty')} class="select input-bordered w-full max-w-xs">
{
    portal.map(service =>
        <option
        key={service._id}
        value={service.name}
        >{service.name}</option>)
}
 
  <option>Marge</option>
  <option>Bart</option>
  <option>Lisa</option>
  <option>Maggie</option>
</select>




</div>
{/* close spcialty filed */}
<div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Photo</span>
   
  </label>
  <input 
     type="file" 
    
     className="input input-bordered w-full max-w-xs" 
  {...register("image", {     
    required:{
      value: true,
      message:'Image is required'
    }
  })}


  />
   <label className="label">
  {errors.name?.type === 'required' &&<span className="label-text-alt text-red-500">{errors.name.message}</span>}
  
    
  
  </label>
  </div>
  {/* close photo url */}







<input className='btn w-full max-w-xs text-white' type="submit" value="Add" />
</form>
        </div>
    );
};

export default AddDoctor;