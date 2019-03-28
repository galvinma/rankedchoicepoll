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
  active_polls: string[];
  closed_polls: string[]
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
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  returnListItem(i: string)
  {
    return (<li key={i} className="pollItem">{i}</li>)
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
              <div className="pollNameContainer">{this.state.active_polls.map(this.returnListItem)}</div>
           </div>
           <div>
              <div className="headerTwo">Closed Polls</div>
              <div className="pollNameContainer">{this.state.closed_polls.map(this.returnListItem)}</div>
           </div>
        </div>
      </div>
  )}
}

const mapStateToProps = (state: State) => ({
  auth_status: state.auth_status
});

export default connect(mapStateToProps)(Home);
