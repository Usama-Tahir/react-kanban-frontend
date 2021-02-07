import { Login, Register } from '../../redux/auth/types';
import axios from '../axios';
export const login = (payload: Login) => {
  return axios.post('/api/auth/login', { data: payload });
};

export const register = (payload: Register) => {
  return axios.post('/api/auth/login', { data: payload });
};
