import axios from 'axios';

export const avatarApi = axios.create( {
  baseURL: 'https://api.dicebear.com/9.x/initials/svg?&backgroundType=gradientLinear&seed='
} );

