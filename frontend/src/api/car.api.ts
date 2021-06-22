import axios from 'axios';

const addCar = async (data: any) => {
  try {
    const car = await axios.post('/car/add/', data);
    return car.data;
  } catch (error) {
    console.log(error);
  }
};

const oneCar = async (params: string, signal: AbortSignal) => {
  try {
    const car = await fetch('/car/one/' + params, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      signal: signal,
    });
    return car.json();
  } catch (error) {
    console.log(error);
  }
};
const listCar = async (signal: AbortSignal) => {
  try {
    const cars = await fetch('/car/list/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      signal: signal,
    });
    return cars.json();
  } catch (error) {
    console.log(error);
  }
};
const addComment = async (params: string, data: any) => {
  try {
    const comment = axios.put('/car/comment/' + params, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return (await comment).data;
  } catch (error) {
    console.log(error);
  }
};

export { addCar, oneCar, listCar, addComment };
