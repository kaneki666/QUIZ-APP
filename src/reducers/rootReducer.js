import {LOGIN_USER, GET_USERDATA, GET_SUBJECTS} from '../actions/types';

const initialState = {token: ''};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      const payloadData = action.payload;

      return {...state, token: payloadData};
    case GET_USERDATA:
      const user_payload = action.payload;

      return {...state, user_data: user_payload};
    case GET_SUBJECTS:
      const subject_payload = action.payload;
      return {...state, subjects: subject_payload};

    default:
      return state;
  }
};
