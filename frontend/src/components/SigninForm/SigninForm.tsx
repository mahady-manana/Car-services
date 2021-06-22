import { Box, IconButton, Button } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { CustomInput } from '../../ui-kit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export type SigninDataProps = {
  email: string;
  password: string;
};
interface SigninFormProps {
  onSubmit: (userData: SigninDataProps) => void;
}
export const SigninForm: FC<SigninFormProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<SigninDataProps>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (event: React.MouseEvent<{}>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event: React.FormEvent<{}>) => {
    event.preventDefault();
    console.log('-------Signin data----------', values);
    onSubmit(values);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Box py={1}>
          <CustomInput
            variant="outlined"
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
          />
        </Box>
        <Box py={1}>
          <CustomInput
            variant="outlined"
            label="Mot de passe"
            name="password"
            value={values.password}
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
            endAdornment={
              <IconButton onClick={handleShowPassword}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOff />}
              </IconButton>
            }
          />
        </Box>
      </Box>

      <Box>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={
            values.email.length === 0 || values.password.length === 0
          }
        >
          Se connecter
        </Button>
      </Box>
    </form>
  );
};
