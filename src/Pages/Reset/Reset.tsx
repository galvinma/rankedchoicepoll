import * as React from "react";
import history from '../.././history';

// css
import './Reset.css'

// components
import ExternalNavbar from '../../Components/Navbar/ExternalNavbar/ExternalNavbar'
import ResetPrompt from '../../Components/Prompts/ResetPrompt'
import GenericAlert from '../../Components/Alerts/GenericAlert/GenericAlert'

class Reset extends React.Component {
  render() {
    return (
      <div>
        <ExternalNavbar />
        <ResetPrompt />
        <GenericAlert />
      </div>
  )}
}

export default (Reset)
