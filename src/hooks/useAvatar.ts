import { avatarApi } from '@/api';
import { useEffect, useState } from 'react';

export const useAvatar = ( name: string ) => {

  const [ avatar, setAvatar ] = useState( '' );

  const getInitialsAvatar = async () => {
    try {
      const { data } = await avatarApi.get( name );
      setAvatar( data );
    } catch ( error ) {
      console.log( error );
    }
  };

  useEffect( () => {
    getInitialsAvatar();
  }, [] );

  return {
    avatar
  };
};