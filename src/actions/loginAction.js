import {LOGIN_USER} from './types';

export const loginUser = (user) => {
  return (user) => {
    console.log('login');
    dispatch({
      type: LOGIN_USER,
      payload: user,
    });
  };
};
