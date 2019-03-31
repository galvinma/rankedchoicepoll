import * as React from "react";
import { Redirect, Link } from 'react-router-dom';
import history from '../.././history';

// css
import '../.././App.css'
import './NewPoll.css'

// components
import InternalNavbar from '../../Components/Navbar/InternalNavbar/InternalNavbar'
import PollPrompt from '../../Components/Prompts/PollPrompt'
import GenericAlert from '../../Components/Alerts/GenericAlert/GenericAlert'

// functions
import { checkAuth } from '../.././Utils/checkauth'

// redux
import store from '../.././Store/store'
const { connect } = require("react-redux");
import { getAuthStatus } from '../.././Actions/actions'

class NewPoll extends React.Component {
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
          <PollPrompt />
          <GenericAlert />
      </div>
  )}
}

export default (NewPoll)
