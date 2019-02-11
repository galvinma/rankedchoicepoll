import * as React from "react";
import history from '../.././history';

// css
import './SignIn.css'

// components
import ExternalNavbar from '../../Components/Navbar/ExternalNavbar/ExternalNavbar'
import SignInPrompt from '../../Components/Prompts/SignInPrompt'

class Join extends React.Component {
  render() {
    return (
      <div>
        <ExternalNavbar />
        <SignInPrompt />
      </div>
  )}
}

export default (Join)
