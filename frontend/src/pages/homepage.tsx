import { Box, Divider, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { listCar } from '../api/car.api';
import { CarItem } from '../components';
import { Loading } from '../components/Loading/Loading';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const abortController = new AbortController();
    listCar(abortController.signal).then((data) => {
      setCars(data);
      setLoading(false);
      console.log('--------home---------', data);
    });
    return () => abortController.abort();
  }, []);

  return (
    <Box p={4}>
      {loading ? (
        <Loading />
      ) : (
        <Box mt={4}>
          {cars.map((car, index) => {
            return <CarItem key={`car-${index}`} car={car} />;
          })}
        </Box>
      )}
    </Box>
  );
};
export default Home;
