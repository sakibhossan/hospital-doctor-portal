import React from 'react';
import doctor from '../../../assets/images/doctor.png';
import appointment from '../../../assets/images/appointment.png';

const MakeAppoinment = () => {
    return (
        <section style={{
           
            background:`url(${appointment})`
            }} className='flex justfy-content items-center'>
            <div className='flex-1 hidden lg:block'>
                <img className='mt-[-150px]' src={doctor} alt="" />
            </div>
            <div className='flex-1 pl-10'>
                <h3 className='text-xl text-primary font-bold'>Appointment</h3>
                <h2 className='text-3xl text-white py-2'>Make an Appoinment Today</h2>
                <p className='text-white py-2'>If you meet doctor then you apply for appoinment leter.You wil get appoinment leter so click GET STARTED button</p>
                <button className="btn btn-primary uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary mb-5">Get Started</button>
            </div>
        </section>
    );
};

export default MakeAppoinment;