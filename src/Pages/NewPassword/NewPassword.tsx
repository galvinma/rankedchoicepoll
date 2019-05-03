import * as React from "react";
import history from '../.././history';

// css
import './NewPassword.css'

// components
import ExternalNavbar from '../../Components/Navbar/ExternalNavbar/ExternalNavbar'
import NewPasswordPrompt from '../../Components/Prompts/NewPasswordPrompt'
import GenericAlert from '../../Components/Alerts/GenericAlert/GenericAlert'

class NewPassword extends React.Component {
  render() {
    return (
      <div>
        <ExternalNavbar />
        <NewPasswordPrompt />
        <GenericAlert />
      </div>
  )}
}

export default (NewPassword)
