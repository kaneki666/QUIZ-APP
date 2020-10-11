import {GET_USERDATA} from './types';

export const getUserdata = (data) => {
  return (dispatch) => {
    dispatch({
      type: GET_USERDATA,
      payload: data,
    });
  };
};
