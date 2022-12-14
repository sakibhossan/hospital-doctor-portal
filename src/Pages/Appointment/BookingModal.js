import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../firebase.init';

const BookingModal = ({ treatment, date,setTreatment,refetch }) => {
  const [user, loading] = useAuthState(auth);
  const formattedDate = format(date, 'PP')
  const {_id, name, slots,price } = treatment;
  const handleBooking = event=>{
    event.preventDefault();
    const slot = event.target.slot.value;
    console.log( _id, name,slot);
    const booking ={
      treatmentId:_id,
      treatment: name,
      date:formattedDate,
      slot,
      price,
      patient: user.email,
      patientName:user.displayName,
      // phone:event.target.phone.value

    }
fetch('http://localhost:5000/booking',{
  method: 'POST',
  headers:{
    'content-type': 'application/json'
  },
  body:JSON.stringify(booking)
})
.then(res =>res.json())
.then(data =>{
  console.log(data);
  // toast('Succes your booking')
  if(data.success){
    toast(` Appointment is  . ${formattedDate} at ${slot}`)

  }
  else{
    toast.error(`You have and appointment on ${data.booking?.date} at ${data.booking?.slot}`)

  }
  refetch();
  setTreatment(null);

})


   
  }

  return (
    <div>


      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="font-bold text-lg text-secondary">Booking for: {name}</h3>
          <form onSubmit={handleBooking} className='grid grid-cols-1 gap-5 justify-items-center mt-5'>
            <input type="text" disabled value={format(date, 'PP')} className="input input-bordered w-full max-w-xs" />
            <select name="slot" className="select select-bordered w-full max-w-xs">
             {
              slots.map((slot, index)=><option 
              key={index}
                vlaue={slot}>
                  {slot}
                  </option>)
             }
            
            </select>
            <input type="text" placeholder="Your Name" disabled value={user?.displayName || ''} className="input input-bordered w-full max-w-xs" />
            <input type="email" name="email" placeholder="Email Address" disabled value={user?.email || ''} className="input input-bordered w-full max-w-xs" />
            <input type="number" placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />
            <input type="submit" value="Submit" className=" btn btn-secondary w-full max-w-xs" />
          </form>


        </div>
      </div>
<ToastContainer></ToastContainer>
    </div>
  );
};

export default BookingModal;