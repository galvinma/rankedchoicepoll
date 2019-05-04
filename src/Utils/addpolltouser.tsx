import axios from 'axios';

export function addPollToUser(poll_id: any, user_id: any)
{
  axios.post(`${process.env.REACT_APP_RANKED_POLL_API_URI}/api/addpolltouser`, {
    params: {
      poll_id: poll_id,
      user_id: user_id,
    }
  })
  .then((response) => {
      // TODO: SNACKBAR
  })
  .catch((error) => {
      // TODO: SNACKBAR
  })
}
