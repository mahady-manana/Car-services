import { Box, IconButton, Button } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { CustomCheckbox, CustomInput } from '../../ui-kit';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export type SignupDataProps = {
  nom: string;
  prenom: string;
  checkbox: boolean;
  email: string;
  password: string;
};
interface SignupFormProps {
  onSubmit: (userData: SignupDataProps) => void;
}
export const SignupForm: FC<SignupFormProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<SignupDataProps>({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    checkbox: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (event: React.MouseEvent<{}>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const vals =
      event.target.name === 'checkbox'
        ? event.target.checked
        : event.target.value;
    setValues({ ...values, [event.target.name]: vals });
  };
  const handleSubmit = (event: React.FormEvent<{}>) => {
    event.preventDefault();
    console.log('-------Signup data----------', values);
    onSubmit && onSubmit(values);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Box py={1}>
          <CustomInput
            variant="outlined"
            label="Nom *"
            name="nom"
            value={values.nom}
            onChange={handleChange}
            startAdornment={<AccountCircle />}
          />
        </Box>

        <Box py={1}>
          <CustomInput
            variant="outlined"
            label="Prénom *"
            name="prenom"
            value={values.prenom}
            onChange={handleChange}
            startAdornment={<AccountCircle />}
          />
        </Box>

        <Box py={1}>
          <CustomInput
            variant="outlined"
            label="Email *"
            name="email"
            value={values.email}
            type="email"
            onChange={handleChange}
            startAdornment={<AlternateEmailIcon />}
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
        <Box py={1}>
          <CustomCheckbox
            onChange={handleChange}
            name="checkbox"
            label="J'accepte les conditions ...."
            checked={values.checkbox}
          />
        </Box>
      </Box>
      <Box>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={
            !values.checkbox ||
            values.email.length === 0 ||
            values.nom.length === 0 ||
            values.password.length === 0
          }
        >
          S'inscrire
        </Button>
      </Box>
    </form>
  );
};
