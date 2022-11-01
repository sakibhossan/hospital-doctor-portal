import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';





const stripePromise = loadStripe('pk_test_51LoSWADtzvuTa9q7UVng6yVvrpKTQWKYuAWsTAMjWoouy4lOLVBqLgPXWKkVTk0vJEH5RkEkpTDaxDy3wISQUJ6z002izVUHxo');
const Payment = () => {
    const { id } = useParams();
    const url = `http://localhost:5000/booking/${id}`;
    const { data: appointment, isLoading } = useQuery(['booking', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>

            <div class="card w-50 max-w-md bg-base-100 shadow-xl my-12 mx-auto">
                <div class="card-body">
                    <h2 class="card-title">Pay for {appointment.treatment}</h2>
                    <p>Your Appointment: <span className='text-red-500'>{appointment.date}</span> at {appointment.slot}</p>
                    <p>Please Pay : ${appointment.price}</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            <div class="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100 mx-auto">
                <div class="card-body">

                    <Elements stripe={stripePromise}>
                        <CheckoutForm appointment={appointment} />
                    </Elements>

                </div>
            </div>
        </div>

    );
};

export default Payment;