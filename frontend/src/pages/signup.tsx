import { Box, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { SignupDataProps, SignupForm } from '../components';
import { add } from '../api/user.api';
import { signin } from '../api/user.auth';
import Auth from '../api/authentication';
import { Redirect } from 'react-router-dom';
import { UserContext } from './../../UserContext';
const Signup = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setUserContext, userContext } = useContext(UserContext);
  const handleLogin = (data: SignupDataProps) => {
    console.log('------login----------', data);
    setLoading(true);
    add(data).then((add_data) => {
      if (add_data && add_data.error) {
        console.log('-------add user error--------', add_data);
      } else {
        signin({
          email: data.email,
          password: data.password,
        }).then((user_data) => {
          if (user_data.error)
            console.log('-------signin user error--------', user_data);
          else {
            Auth.authenticate(user_data, () => {
              const { nom, prenom, email } = user_data;
              setSuccess(true);
              setUserContext((prev: any) => ({
                ...prev,
                nom: nom,
                prenom: prenom,
                email: email,
                connected: true,
              }));
            });
          }
        });
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
      <Box display="flex" justifyContent="center">
        <Box>
          <Typography variant="h3" color="primary">
            S'inscrire
          </Typography>
          <SignupForm onSubmit={handleLogin} />
        </Box>
      </Box>
    </div>
  );
};
export default Signup;
