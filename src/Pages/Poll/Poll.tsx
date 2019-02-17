import * as React from "react";
import { Redirect, Link } from 'react-router-dom';
import history from '../.././history';
import axios from 'axios';

// redux
import store from '../.././Store/store'
const { connect } = require("react-redux");
import {getAuthStatus, getCurrentUser} from '../.././Actions/actions'

// functions
import { checkAuth } from '../.././Utils/checkauth'

// css
import '../.././App.css'
import './Poll.css'

// components
import InternalNavbar from '../../Components/Navbar/InternalNavbar/InternalNavbar'


// Props / State
interface Props {
  auth_status: boolean
}

interface State {
  title: string;
  poll_items: string[]
  auth_status: boolean
}

class Poll extends React.Component <Props, State> {
  constructor(props: any)
  {
    super(props)

    this.state = {
      title: "",
      poll_items: [],
      auth_status: false,
    };
  }

  componentDidMount()
  {
    var id = window.location.pathname.split("/").pop()
    axios.post(`${process.env.REACT_APP_RANKED_POLL_API_URI}/api/returnpoll`, {
      params: {
        poll_id: id
      }
    })
    .then((response) =>
    {
      console.log(response.data.poll_items)
      this.setState({
        title: response.data.title,
        poll_items: response.data.poll_items,
      })
    })
  }

  returnListItem(i: string)
  {
    return (
      <div>
          {i}
      </div>
    )
  }

  public render() {
    if (store.getState().auth_status === false)
     {
       checkAuth()
       .then(function(){
         if (store.getState().auth_status.auth_status === false)
         {
           return <Redirect to='/' />
         }
       })
       .catch(function(error)
       {
         return <Redirect to='/' />
       })
     }

    return (
      <div>
          <InternalNavbar />
          <div>{this.state.title}</div>

          <div>
            {this.state.poll_items.map(this.returnListItem)}
          </div>
      </div>
  )}
}

const mapStateToProps = (state: State) => ({
  auth_status: state.auth_status
});

export default connect(mapStateToProps)(Poll);
