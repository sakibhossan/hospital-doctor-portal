import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const MyAppointments = () => {
    const [user] = useAuthState(auth);
    const [appoinentment, setAppointment] = useState([]);
    useEffect(() => {
if(user){
    fetch(`http://localhost:5000/booking?patient=${user.email}`)
    .then(res=>res.json())
    .then(data=> setAppointment(data));
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
              </tr>)
        }
 
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyAppointments;