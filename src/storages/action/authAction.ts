/* eslint-disable */
import {Dispatch} from 'redux';
import {setEmail, setRole} from '../reducers/authReducer';

export const login = (email: string, role: 'kasir' | 'owner') => {
  return (dispatch: Dispatch) => {
    dispatch(setEmail(email));
    dispatch(setRole(role));
  };
};
