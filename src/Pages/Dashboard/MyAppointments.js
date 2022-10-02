import { signOut } from 'firebase/auth';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const MyAppointments = () => {
    const [user ] = useAuthState(auth);
    const [appoinentment, setAppointment] = useState([]);
const navigate = useNavigate();
   
    useEffect(() => {
if(user){
    fetch(`http://localhost:5000/booking?patient=${user.email}`,{
      method: 'GET',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then(res=>{
      console.log('res',res);
      if(res.status ===401||res.status  === 403){
        signOut(auth);
        localStorage.removeItem('accessToken');
        

        navigate('/');
      }
    
     return res.json()
    })
    .then(data=> {
      // console.log(data)
      setAppointment(data)
     
    });
}
    },[user])
    return (
        <div>
            <h2>My Appoinment:{appoinentment.length}</h2>
            <div class="overflow-x-auto">
  <table class="table w-full">
    {/* <!-- head --> */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Date</th>
        <th>Rime</th>
        <th>Treatment</th>
        <th>Payment</th>
      </tr>
    </thead>
    <tbody>
        {
            appoinentment.map((a,index)=>
                <tr>
                <th>{index + 1}</th>
                <td>{a.patientName}</td>
                <td>{a.date}</td>
                <td>{a.slot}</td>
                <td>{a.treatment}</td>
                <td>{(a.price && !a.paid) && <Link to={`/dashboard/payment/${a._id}`}> <button className='btn btn-xs btn-success'>Pay</button></Link>}
                {(a.price && !a.paid) &&  <span className='text-success'>Paid</span>}
                </td>
              </tr>)
        }
 
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyAppointments;