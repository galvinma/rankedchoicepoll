import * as React from "react";
import history from '../.././history';

// css
import '../.././App.css'
import './Landing.css'

// Images
var landing = require('../.././Images/OliveTreeBrownLeavesFirstPass.svg')

// components
import ExternalNavbar from '../../Components/Navbar/ExternalNavbar/ExternalNavbar'

class Landing extends React.Component {
  public render() {
    return (
      <div>
        <ExternalNavbar />
        <div className="headerOne">Ranked Choice Poll</div>
        <div className="headerTwo">Because how we vote matters.</div>
         <svg viewBox="0 0 100 100" id="landing_background" style ={{ backgroundImage: "url("+landing+")" }}/>
      </div>
  )}
}

export default (Landing)
