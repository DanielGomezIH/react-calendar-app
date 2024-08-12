import { getEnvironments } from '@/helpers';
import axios from 'axios';

const { VITE_API_URL } = getEnvironments();

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

//Todo: Configurar interceptores

export default calendarApi;
