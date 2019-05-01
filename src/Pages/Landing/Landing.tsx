import * as React from "react";
import history from '../.././history';
import ReactSVG from 'react-svg'

// css
import '../.././App.css'
import './Landing.css'

// Images
var ballot = require('../.././Images/ballot.svg')

// components
import ExternalNavbar from '../../Components/Navbar/ExternalNavbar/ExternalNavbar'
import Card from '../../Components/Card/Card'

class Landing extends React.Component {
  public render() {
    return (
      <div>
        <ExternalNavbar />
        <div className="landingContainer">
          <div className="landingCard">
            <Card
              header="How we vote matters"
              content="Create polls and learn more about ranked choice voting."
              linkText="Find out more."
              link="info"/>
          </div>
          <div className="landingSVGContainer">
            <img src={ballot} className="landingImage"/>
          </div>
        </div>
      </div>
  )}
}

export default (Landing)
