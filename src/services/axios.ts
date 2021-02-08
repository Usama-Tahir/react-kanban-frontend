import axios from 'axios';
export default axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    'https://frozen-savannah-34568.herokuapp.com',
  withCredentials: true,
});
