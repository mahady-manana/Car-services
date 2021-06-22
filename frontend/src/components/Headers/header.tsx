import { Avatar, Box, Button, Typography } from '@material-ui/core';
import React, {
  useEffect,
  useState,
  useContext,
  FC,
  MouseEvent,
} from 'react';
import { UserContext } from '../../../UserContext';
import { useStyles } from './styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import Auth from '../../api/authentication';
import { signout } from '../../api/user.auth';

interface HeadersProps {}
export const Headers = () => {
  const classes = useStyles();

  const [user, setUser] = useState({
    nom: '',
    prenom: '',
    email: '',
    connected: false,
  });

  const [logout, setlLogout] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { userContext } = useContext(UserContext);

  console.log('----------isAuthenticated-------', Auth.isAuthenticated());
  console.log('----------userContext-------', userContext);

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
  }, [logout, userContext]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = (event: MouseEvent<{}>) => {
    event.preventDefault();
    signout().then((data) => {
      if (data && data.error) console.log(data.error);
      else {
        Auth.clearJWT(() => {
          setlLogout(true);
          window.location.reload();
        });
      }
    });
  };

  return (
    <header className={classes.header}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Link to="/">
            <Typography variant="h1" className={classes.logo}>
              Car Services
            </Typography>
          </Link>
        </Box>
        <Box>
          {user.connected ? (
            <Box display="flex" alignItems="center">
              <Box
                display="flex"
                alignItems="center"
                style={{ cursor: 'pointer' }}
                onClick={handleClick}
              >
                <Box mr={1}>
                  <Avatar></Avatar>
                </Box>
                <Box>
                  <Typography style={{ color: '#fff' }}>
                    {user.nom} {user.prenom}
                  </Typography>
                </Box>
              </Box>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Se deconnecter</MenuItem>
              </Menu>
              {user.email === 'admin@gmail.com' && (
                <Box ml={1}>
                  <Link to="/admin">
                    <Button variant="outlined" style={{ color: '#fff' }}>
                      Admin - Ajouter voiture
                    </Button>
                  </Link>
                </Box>
              )}
            </Box>
          ) : (
            <Box>
              <Link to="/login">
                <Button
                  variant="outlined"
                  style={{ color: '#fff', marginRight: 15 }}
                >
                  Se connecter
                </Button>
              </Link>

              <Link to="/signup">
                <Button variant="outlined" style={{ color: '#fff' }}>
                  S'inscrire
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Box>
    </header>
  );
};
