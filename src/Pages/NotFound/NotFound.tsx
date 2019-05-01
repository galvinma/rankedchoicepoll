import * as React from "react";
import history from '../.././history';
import axios from 'axios';

// css
import '../.././App.css'
import './NotFound.css'

// components
import ExternalNavbar from '../../Components/Navbar/ExternalNavbar/ExternalNavbar'
import Card from '../../Components/Card/Card'

// Props / State
interface Props {}

interface State {}

class NotFound extends React.Component <Props, State> {

  public render() {
    return (
      <div>
        <ExternalNavbar />
        <div className="notFoundContainer">
          <div className="notFoundCard">
            <Card
              header="Page not found."
              content=""
              linkText="Take me back."
              link="" />
          </div>
        </div>
      </div>
  )}
}

export default (NotFound)
