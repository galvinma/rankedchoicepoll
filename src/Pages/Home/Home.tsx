import * as React from "react";

// css
import '../.././App.css'
import './Home.css'

// components
import InternalNavbar from '../../Components/Navbar/InternalNavbar/InternalNavbar'

class Home extends React.Component {
  public render() {
    return (
      <div>
        <InternalNavbar />
        <a className="headerOne" href="/newpoll">Create New Poll</a>
        <br/>
        <a className="headerOne" href="/home">Join Existing Poll</a>
      </div>
  )}
}

export default (Home)
