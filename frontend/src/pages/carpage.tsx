import { Box, Divider, Typography, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Auth from '../api/authentication';
import { addComment, oneCar } from '../api/car.api';
import { Comment, CommentForm } from '../components';
import { Link } from 'react-router-dom';
import { Loading } from '../components/Loading/Loading';
const OneCarPage = (props: any) => {
  const [cars, setCars] = useState({
    modele: '',
    annee: '',
    description: '',
    dimensions: '',
    firme: '',
    image: '',
    moteur: '',
    transmission: '',
    comments: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [newComment, setNewComment] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  useEffect(() => {
    let cleanup = false;
    if (Auth.isAuthenticated()) {
      setIsAuth(true);
    }
    return () => {
      cleanup = true;
    };
  }, []);
  useEffect(() => {
    const abortController = new AbortController();

    oneCar(props.match.params.id, abortController.signal).then((data) => {
      setCars((prev) => ({
        ...prev,
        modele: data.modele || '',
        description: data.description || '',
        annee: data.annee || '',
        dimensions: data.dimensions || '',
        firme: data.firme || '',
        image: data.image || '',
        moteur: data.moteur || '',
        transmission: data.transmission || '',
        comments: data.comment || [],
      }));
      setLoading(false);
      console.log('----------- Single car -------', data);
      console.log('----------- Single car -------', props.location);
    });

    return () => abortController.abort();
  }, [newComment]);
  const handleComment = (comment: any) => {
    const data = {
      user: Auth.isAuthenticated().user.nom,
      date: Date.now(),
      comment: comment,
    };

    addComment(props.match.params.id, data).then((data) => {
      if (data && data.error)
        console.log('---------data errror comment-------', data);
      else {
        console.log('----------data return from comment---------', data);
        setNewComment(!newComment);
      }
    });
  };
  return (
    <Box p={4}>
      {loading ? (
        <Loading />
      ) : (
        <Box>
          <Box>
            <Typography variant="h3">Details : {cars.modele}</Typography>
          </Box>
          <Divider />
          <Box my={2} display="flex">
            <Box width="50%" minWidth="50%">
              <img src={cars.image || ''} alt="bus" width="100%" />
            </Box>
            <Box pl={2}>
              <Typography variant="h5">Modele: {cars.modele}</Typography>
              <Typography>Firme : {cars.firme}</Typography>
              <Typography>Annee de production : {cars.annee}</Typography>
              <Typography>Moteur : {cars.moteur}</Typography>
              <Typography>Dimensions : {cars.dimensions}</Typography>
              <Typography>Dransmission : {cars.transmission}</Typography>
              <Typography>Description : {cars.description}</Typography>
            </Box>
          </Box>
          <Typography variant="h5">Commaintaires</Typography>
          <Divider />
          <Box>
            {cars.comments.map((comment: any, index: number) => {
              return <Comment data={comment} key={`comment-${index}`} />;
            })}
          </Box>
          <Box>
            {isAuth ? (
              <CommentForm onSubmit={handleComment} />
            ) : (
              <Box>
                <Box p={2}>
                  <Typography>
                    Vous devez connecter pour faire des commentaires
                  </Typography>
                </Box>
                <Box>
                  <Link to="/login">
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ marginRight: 15 }}
                    >
                      Se connecter
                    </Button>
                  </Link>

                  <Link to="/signup">
                    <Button variant="outlined" color="primary">
                      S'inscrire
                    </Button>
                  </Link>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default OneCarPage;
