import * as React from "react";
import history from '../.././history';

// css
import '../.././App.css'
import './Info.css'

// components
import ExternalNavbar from '../../Components/Navbar/ExternalNavbar/ExternalNavbar'

class Info extends React.Component {
  public render() {
    return (
      <div>
        <ExternalNavbar />
      </div>
  )}
}

export default (Info)
