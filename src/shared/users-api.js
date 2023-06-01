import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://6400f868ab6b7399d09eacf7.mockapi.io/api/users',
});

export const getUsers = async () => {
  const { data } = await instance.get('/');
  return data;
};

export const updateUserFollowers = async (id, data) => {
  try { 
    const { data: result } = await instance.put(`/${id}`, data);
    return result;
  } catch (error) {
    console.log(error) 
    throw error;
  }
};