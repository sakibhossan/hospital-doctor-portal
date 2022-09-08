import React from 'react';
import appointment from '../../../assets/images/appointment.png';

const FormContact = () => {
    return (
        <div
      
         style={{
            background:`url(${appointment})`
           

        }}>
            <h2 className='text-center text-success text-2xl pt-5 '>Contact Us</h2>
            <h2 className='text-center text-2xl text-white my-5'>Stay Connected With us</h2>
            <form className='text-center   items-center justify-center  '>
                <input className='rounded-full pl-5 mt-5 py-3 w-56 md:w-72 lg:w-96'  type="email" name="email" placeholder='Email Address' id="" />
                <br />

                <input className='rounded-full pl-5 mt-5 py-3 w-56 md:w-72 lg:w-96 '  type="name" name="Subject" placeholder='Subject' id="" />
                <br />
                <textarea className='rounded-full pl-5 mt-5 py-3 w-56 md:w-72 lg:w-96 '  type="name" name="description" placeholder="Your message">
                   
                </textarea>
                <br />
                <button className="btn btn-primary lowercase text-white font-bold bg-gradient-to-r from-secondary to-primary mt-5 mb-5 py-2 px-8 ">Submit</button>
            </form>
        </div>
    );
};

export default FormContact;
