import { Box, Button, Typography } from '@material-ui/core';
import React, { useEffect, useState, FC } from 'react';
import { CustomInput } from '../../ui-kit';
import Auth from '../../api/authentication';
import { Cloudinary } from '../../api/cloudinary';

export type AdminCarProps = {
  modele?: string;
  annee?: string;
  description?: string;
  firme?: string;
  moteur?: string;
  dimensions?: string;
  transmission?: string;
  image?: string;
};
interface AdminFormProps {
  onSubmit?: (car: AdminCarProps) => void;
}
export const AdminForm: FC<AdminFormProps> = ({ onSubmit }) => {
  const [user, setUser] = useState({
    nom: '',
    prenom: '',
    email: '',
    connected: false,
  });
  const [car, setCar] = useState<AdminCarProps>({
    modele: '',
    annee: '',
    description: '',
    firme: '',
    moteur: '',
    dimensions: '',
    transmission: 'Manuel',
    image: '',
  });

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files;
    if (file !== null && file.length > 0) {
      Cloudinary(file[0])
        .then((data) => {
          setCar((prev: any) => ({ ...prev, image: data.secure_url }));
        })
        .catch((error) => console.log(error));
    }
  };
  useEffect(() => {
    let cleanup = false;
    if (Auth.isAuthenticated()) {
      const { nom, prenom, email } = Auth.isAuthenticated().user;
      setUser({
        ...user,
        nom: nom,
        prenom: prenom,
        email: email,
        connected: true,
      });
    }
    console.log(
      '-----------mount user authentification',
      Auth.isAuthenticated(),
    );
    return () => {
      cleanup = true;
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setCar({ ...car, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event: React.FormEvent<{}>) => {
    event.preventDefault();
    console.log('-------Signup data----------', car);
    onSubmit && onSubmit(car);
  };

  return (
    <Box>
      {user.email === 'admin@gmail.com' && user.nom === 'Admin' ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <form onSubmit={handleSubmit}>
            <Box>
              <Box py={1}>
                <CustomInput
                  variant="outlined"
                  label="Firme"
                  name="firme"
                  value={car.firme}
                  onChange={handleChange}
                />
              </Box>
              <Box py={1}>
                <CustomInput
                  variant="outlined"
                  label="Modele ou Nom"
                  name="modele"
                  value={car.modele}
                  onChange={handleChange}
                />
              </Box>
              <Box py={1}>
                <CustomInput
                  variant="outlined"
                  label="Moteur"
                  name="moteur"
                  value={car.moteur}
                  onChange={handleChange}
                />
              </Box>
              <Box py={1}>
                <CustomInput
                  variant="outlined"
                  label="Transmission"
                  name="transmission"
                  value={car.transmission}
                  onChange={handleChange}
                />
              </Box>

              <Box py={1}>
                <CustomInput
                  variant="outlined"
                  label="Annee de production"
                  name="annee"
                  value={car.annee}
                  onChange={handleChange}
                />
              </Box>
              <Box py={1}>
                <CustomInput
                  variant="outlined"
                  label="Dimensions"
                  name="dimensions"
                  value={car.dimensions}
                  onChange={handleChange}
                />
              </Box>

              <Box py={1}>
                <Button component="label" variant="contained">
                  Choisir image
                  <input type="file" onChange={handleUpload} hidden />
                </Button>
              </Box>
              <Box py={1}>
                <CustomInput
                  variant="outlined"
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  value={car.description}
                  onChange={handleChange}
                />
              </Box>
            </Box>
            <Box>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={
                  car.annee?.length === 0 ||
                  car.description?.length === 0 ||
                  car.modele?.length === 0
                }
              >
                Ajouter
              </Button>
            </Box>
          </form>
        </Box>
      ) : (
        <Box height="100vh" display="flex" alignItems="center">
          <Typography variant="h4">
            {' '}
            Vous n'avez pas d'autorisation pour acceder a cette pages
          </Typography>
        </Box>
      )}
    </Box>
  );
};
