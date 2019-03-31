import * as React from "react";
import { Redirect, Link } from 'react-router-dom';
import history from '../.././history';
import axios from 'axios';

// css
import '../.././App.css'
import './Home.css'

// functions
import { checkAuth } from '../.././Utils/checkauth'

// components
import InternalNavbar from '../../Components/Navbar/InternalNavbar/InternalNavbar'
import GenericAlert from '../../Components/Alerts/GenericAlert/GenericAlert'

// redux
import store from '../.././Store/store'
const { connect } = require("react-redux");
import { getAuthStatus } from '../.././Actions/actions'

// Props / State
interface Props {
  auth_status: boolean
}

interface State {
  auth_status: boolean;
  active_polls: UserPolls[];
  closed_polls: UserPolls[];
}

interface UserPolls {
  poll_id: string;
  admin_name: string;
  title: string;
  status: string;
}

class Home extends React.Component <Props, State> {
  constructor(props: any)
  {
    super(props)
    this.state = {
      auth_status: false,
      active_polls: [],
      closed_polls: [],
    }

    this.handlePush = this.handlePush.bind(this)
    this.returnListItem = this.returnListItem.bind(this)
  }

  componentDidMount()
  {
    axios.post(`${process.env.REACT_APP_RANKED_POLL_API_URI}/api/returnuserpolls`, {
      params: {
        user_id: localStorage.getItem('user'),
      }
    })
    .then((response) => {
      this.setState({
        active_polls: response.data.active_polls,
        closed_polls: response.data.closed_polls,
      })
    })
    .catch((error) => {
      // TODO: SNACKBAR
    })
  }

  public handlePush(event: any, status: string)
  {
    if (String(status) === 'false')
    {
      history.push(`/result/${event.target.id}`)
    }
    else
    {
      history.push(`/poll/${event.target.id}`)
    }
  }

  public returnListItem(i: UserPolls)
  {
    return (<li id={i.poll_id} key={i.title+i.poll_id} className="pollItem" onClick={(e) => this.handlePush(e, i.status)}>{i.title} by {i.admin_name}</li>)
  }

  public render() {
    if (store.getState().auth_status === false)
     {
       checkAuth()
       .then(function(){
         if (store.getState().auth_status.auth_status === false || store.getState().auth_status.auth_status === undefined)
         {
           history.push('/')
         }
       })
       .catch(function(error)
       {
         history.push('/')
       })
     }

    return (
      <div>
        <InternalNavbar />
        <div className="homeContainer">
           <Link className="headerTwo homeLink" to="/newpoll">Create New Poll</Link>
           <div>
              <div className="headerTwo">My Active Polls</div>
              <div className="pollNameContainer">
                {this.state.active_polls.map(this.returnListItem)}
              </div>
           </div>
           <div>
              <div className="headerTwo">Closed Polls</div>
              <div className="pollNameContainer">
                {this.state.closed_polls.map(this.returnListItem)}
              </div>
           </div>
        </div>
        <GenericAlert />        
      </div>
  )}
}

const mapStateToProps = (state: State) => ({
  auth_status: state.auth_status
});

export default connect(mapStateToProps)(Home);
