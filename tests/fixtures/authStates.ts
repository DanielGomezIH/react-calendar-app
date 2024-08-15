import { initialStateProps } from '../../src/store/auth/authSlice';
import { userLoginCredentials } from './testUser';

export const initialState: initialStateProps = {
  status: 'checking',

  user: {
    uid: null,
    name: null,
    email: null,
  },

  errorMessage: null,
};

export const authenticatedState: initialStateProps = {
  status: 'authenticated',

  user: userLoginCredentials,

  errorMessage: null,
};

export const notAuthenticatedState: initialStateProps = {
  status: 'not-authenticated',

  user: {
    uid: null,
    name: null,
    email: null,
  },

  errorMessage: null,
};
