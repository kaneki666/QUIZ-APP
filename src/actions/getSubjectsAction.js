import axios from 'axios';
import {POST_SUBJECTS, GET_SUBJECTS} from './types';

export const getSubjects = (user_class) => {
  return (dispatch) => {
    dispatch({
      type: POST_SUBJECTS,
      payload: user_class,
    });
    return axios
      .post('https://quizolympiadserver.herokuapp.com/subject', {
        Class: user_class,
      })
      .then((response) => {
        return dispatch({
          type: GET_SUBJECTS,
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
