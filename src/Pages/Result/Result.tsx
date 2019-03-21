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
import { tallyVotes } from '../.././Utils/tallyvotes'

// css
import '../.././App.css'
import './Result.css'

// components
import InternalNavbar from '../../Components/Navbar/InternalNavbar/InternalNavbar'

// Props / State
interface Props {
  auth_status: boolean,
}

interface State {
  leader: string,
  auth_status: boolean,
}

class Result extends React.Component <Props, State> {
  constructor(props: any)
  {
    super(props)

    this.state = {
      leader: "",
      auth_status: false,
    };
  }

  componentDidMount()
  {
    var id = window.location.pathname.split("/").pop() || ""
    tallyVotes(id)
    .then((response: any) => {
      this.setState({
        leader: response.leader
      })
    })
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
        <div className="pollResultContainer">
          <div className="pollLeader">{this.state.leader}</div>
        </div>
      </div>
  )}
}

const mapStateToProps = (state: State) => ({
  auth_status: state.auth_status
});

export default connect(mapStateToProps)(Result);
