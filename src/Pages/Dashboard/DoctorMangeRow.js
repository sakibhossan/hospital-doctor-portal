import React from 'react';


const DoctorMangeRow = ({ doctor, index,setDeletingDoctor }) => {
  const { name,spacialty,img } = doctor;

  return (

    <tr>
      <th>{index + 1}</th>
      <td>
        <div class="avatar">
  <div class="w-8 rounded">
    <img src={img}alt={name} />
  </div>
  </div>
  </td>
      <td>{name}</td>
      <td>{spacialty}</td>
        
      <td>
      <label onClick={() => setDeletingDoctor(doctor)} for="delete-confrim-modal" class="btn btn-xs btn-error">Delete</label>
       
        </td>
    </tr>
  );
};

export default DoctorMangeRow;