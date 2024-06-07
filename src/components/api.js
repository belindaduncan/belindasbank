import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

export const createAccount = (name, email, password) =>
  api.get(`/account/create/${name}/${email}/${password}`);

export const login = (email, password) =>
  api.post('/account/login', { email, password });

export const getAllAccounts = () => api.get('/account/all');