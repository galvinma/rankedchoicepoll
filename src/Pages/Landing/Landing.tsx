import * as React from "react";
import history from '../.././history';

// css
import '../.././App.css'
import './Landing.css'

// Images
var tree = require('../.././Images/TreeColoredFirstPass.svg')


// components
import ExternalNavbar from '../../Components/Navbar/ExternalNavbar/ExternalNavbar'

class Landing extends React.Component {
  public render() {
    return (
      <div>
        <ExternalNavbar />
        <div className="headerOne primaryColor">Ranked Choice Poll</div>
        <div className="headerTwo primaryColor">Because how we vote matters.</div>
         <svg viewBox="0 0 100 100" id="landing_background" style ={{ backgroundImage: "url("+tree+")" }}/>
      </div>
  )}
}

export default (Landing)
