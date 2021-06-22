import axios from 'axios';

const add = async (data: any) => {
  try {
    const user = await axios.post('/user/add/', data);
    return user.data;
  } catch (error) {
    console.log(error);
  }
};

const oneUser = async (params: string, signal: AbortSignal) => {
  try {
    const user = await fetch('/user/one/' + params, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      signal: signal,
    });
    return user.json();
  } catch (error) {
    console.log(error);
  }
};

export { add, oneUser };
