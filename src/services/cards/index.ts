import axios from '../axios';
export const addCardApi = (title: string) => {
  return axios.post(
    '/api/cards',
    { title },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
};

export const updateCardApi = (id: string, payload: object) => {
  return axios.patch(
    `/api/cards/${id}`,
    { ...payload },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
};

export const getCardsApi = () => {
  return axios.get('/api/cards', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
