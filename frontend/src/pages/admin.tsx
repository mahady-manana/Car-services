import React, { useState } from 'react';
import { addCar } from '../api/car.api';
import { Redirect } from 'react-router-dom';
import { AdminCarProps, AdminForm } from '../components';

const Admin = () => {
  const [success, setSuccess] = useState(false);
  const handleAddCar = (car: AdminCarProps) => {
    addCar(car).then((data) => {
      if (data && data.error) console.log(data.error);
      else {
        setSuccess(true);
      }
    });
  };
  if (success) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }
  return (
    <div>
      <AdminForm onSubmit={handleAddCar} />
    </div>
  );
};
export default Admin;
