import axios from 'axios';
import { errorMessage } from './errorMessage';

const instance = axios.create({
  baseURL: 'https://6400f868ab6b7399d09eacf7.mockapi.io/api/users',
});

export const getAllUsers = async () => {
  try {
     const { data } = await instance.get('/');
  return data;
  } catch (error) {
    errorMessage(error)
    throw error;
  }
  
};

export const updateUserFollowers = async (id, data) => {
  try { 
    const { data: result } = await instance.put(`/${id}`, data);
    return result;
  } catch (error) { 
    errorMessage(error)
    throw error;
  }
};