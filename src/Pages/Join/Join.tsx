import * as React from "react";
import history from '../.././history';

// css
import './Join.css'

// components
import ExternalNavbar from '../../Components/Navbar/ExternalNavbar/ExternalNavbar'
import JoinPrompt from '../../Components/Prompts/JoinPrompt'
import GenericAlert from '../../Components/Alerts/GenericAlert/GenericAlert'

class Join extends React.Component {
  render() {
    return (
      <div>
        <ExternalNavbar />
        <JoinPrompt />
        <GenericAlert />
      </div>
  )}
}

export default (Join)
