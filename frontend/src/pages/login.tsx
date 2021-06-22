import { Box, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { SigninDataProps, SigninForm } from '../components';
import { signin } from '../api/user.auth';
import Auth from '../api/authentication';
import { Redirect } from 'react-router-dom';
import { UserContext } from './../../UserContext';
const Login = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { setUserContext, userContext } = useContext(UserContext);
  const handleLogin = (data: SigninDataProps) => {
    console.log('------login----------', data);
    setLoading(true);
    signin({
      email: data.email,
      password: data.password,
    }).then((user_data) => {
      if (user_data.error)
        console.log('-------signin user error--------', user_data);
      else {
        Auth.authenticate(user_data, () => {
          const { nom, prenom, email } = user_data.user;
          setLoading(false);
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
            Se connecter
          </Typography>
          <SigninForm onSubmit={handleLogin} />
        </Box>
      </Box>
    </div>
  );
};
export default Login;
