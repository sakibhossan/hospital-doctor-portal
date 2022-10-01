import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import DeleteConformModal from './DeleteConformModal';
import DoctorMangeRow from './DoctorMangeRow';

const ManageDoctors = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);
    const {data: doctors ,isLoading,refetch} =useQuery('doctors',()=>fetch('http://localhost:5000/doctor',{
    headers: {
        // 'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`

    }
    }).then(res=>res.json()));
    
   
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className="text2xl">Manage Doctor:{doctors.length}</h2>
            <div class="overflow-x-auto">
  <table class="table w-full">
   
    <thead>
      <tr>
        <th></th>
        <th>Avater</th>
        <th>Name</th>
        <th>Specialty</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
       
    
    {
        
        doctors.map((doctor,index)=><DoctorMangeRow
         key={doctor._key}
         doctor={doctor}
         index={index}
         refetch={refetch}
         setDeletingDoctor={setDeletingDoctor}
         ></DoctorMangeRow>)
    }
    </tbody>
  </table>
</div>
{
deletingDoctor && <DeleteConformModal 
deletingDoctor={deletingDoctor}
refetch={refetch}
setDeletingDoctor={setDeletingDoctor}
></DeleteConformModal>
}
        </div>
    );
};

export default ManageDoctors;