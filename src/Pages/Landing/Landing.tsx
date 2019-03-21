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
              content="Create polls and learn more about ranked choice polling"
              link="Find out more."/>
          </div>
          <div className="landingSVGContainer">
            <ReactSVG src={ballot} svgClassName="landingImage"/>
          </div>
        </div>
      </div>
  )}
}

export default (Landing)
