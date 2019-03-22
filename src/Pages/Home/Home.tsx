import * as React from "react";
import { Redirect, Link } from 'react-router-dom';
import history from '../.././history';

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
  auth_status: boolean
}

class Home extends React.Component <Props, State> {
  constructor(props: any)
  {
    super(props)
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
           <Link className="headerTwo homeLink" to="/joinpoll">Join Existing Poll</Link>
        </div>
      </div>
  )}
}

const mapStateToProps = (state: State) => ({
  auth_status: state.auth_status
});

export default connect(mapStateToProps)(Home);
