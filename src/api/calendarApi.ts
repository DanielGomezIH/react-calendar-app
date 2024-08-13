import { getEnvironments } from '@/helpers';
import axios, { AxiosInstance } from 'axios';

const { VITE_API_URL } = getEnvironments();

const calendarApi: AxiosInstance = axios.create( {
  baseURL: VITE_API_URL,
} );

// Todo: Configurar interceptores

calendarApi.interceptors.request.use( config => {

  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem( 'token' )
  };

  return config;
} );

export default calendarApi;
