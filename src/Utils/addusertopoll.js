import axios from 'axios';

export function addUserToPoll(poll_id, user_id)
{
  axios.post(`${process.env.REACT_APP_RANKED_POLL_API_URI}/api/addusertopoll`, {
    params: {
      poll_id: poll_id,
      user_id: user_id,
    }
  })
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })
}
