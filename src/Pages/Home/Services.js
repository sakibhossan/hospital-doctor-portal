import React from 'react';
import fluoride from '../../assets/images/fluoride.png';
import cavity from '../../assets/images/cavity.png';
import whitening from '../../assets/images/whitening.png';
import Service from './Service';


const Services = () => {
    const services =[
        {
            _id: 1,
            name: 'Fluoride Treatmen',
            decription : 'This is best treatmen in the fluoride',
            img: fluoride
        },
        {
            _id: 2,
            name: 'Cavity Treatmen',
            decription : 'This is best treatmen in the Cavity',
            img: cavity
        },
        {
            _id: 3,
            name: 'Whitening Treatmen',
            decription : 'This is best treatmen in the Whitening',
            img: whitening
        },
    ];
    return (
        <div className='my-28'>
           <div className='text-center'>
           <h3 className='text-primary text-xl font-bold uppercase'>our services</h3>
            <h2 className='font-bold'>Services We Provide</h2>
           </div>
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {

                services.map(service => <Service
                key={service._id}
                service ={service}
                ></Service>)
            }

           </div>
        </div>
    );
};

export default Services;