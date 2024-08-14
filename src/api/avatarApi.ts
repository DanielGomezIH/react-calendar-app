import axios, { AxiosInstance } from 'axios';

export const avatarApi: AxiosInstance = axios.create( {
  baseURL: 'https://api.dicebear.com/9.x/initials/svg?&backgroundType=gradientLinear&seed='
} );

