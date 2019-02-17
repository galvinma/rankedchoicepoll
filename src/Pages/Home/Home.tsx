import * as React from "react";
import { Redirect, Link } from 'react-router-dom';

// css
import '../.././App.css'
import './Home.css'

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
         <Link className="headerOne" to="/newpoll">Create New Poll</Link>
        <br/>
         <Link className="headerOne" to="/joinpoll">Join Existing Poll</Link>
      </div>
  )}
}

const mapStateToProps = (state: State) => ({
  auth_status: state.auth_status
});

export default connect(mapStateToProps)(Home);
