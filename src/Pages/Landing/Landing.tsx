import * as React from "react";

// css
import '../.././App.css'
import './Landing.css'

// components
import ExternalNavbar from '../../Components/Navbar/ExternalNavbar/ExternalNavbar'

class Landing extends React.Component {
  public render() {
    return (
      <div>
        <ExternalNavbar />
        <div className="headerOne">Ranked Choice Poll</div>
        <div className="headerTwo">Because how we vote matters.</div>
      </div>
  )}
}

export default (Landing)
