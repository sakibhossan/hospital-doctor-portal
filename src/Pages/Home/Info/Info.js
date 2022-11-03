import React from 'react';
import InfoCart from './InfoCart';
import clock from '../../../assets/icons/clock.svg';
import marker from '../../../assets/icons/marker.svg';
import phone from '../../../assets/icons/phone.svg';


const Info = () => {
    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
            <InfoCart cardTitle="Opening Hours" bgClass="bg-gradient-to-r from-secondary to-primary" img={clock}></InfoCart>
            <InfoCart cardTitle="Ours Locations" bgClass="bg-accent" img={marker}></InfoCart>
            <InfoCart cardTitle="Contact Us" bgClass="bg-gradient-to-r from-secondary to-primary " img={phone}></InfoCart>
        </div>
    );
};

export default Info;