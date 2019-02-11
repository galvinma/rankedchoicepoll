import * as React from "react";
import history from '../.././history';

// css
import './Join.css'

// components
import ExternalNavbar from '../../Components/Navbar/ExternalNavbar/ExternalNavbar'
import JoinPrompt from '../../Components/Prompts/JoinPrompt'

class Join extends React.Component {
  render() {
    return (
      <div>
        <ExternalNavbar />
        <JoinPrompt />
      </div>
  )}
}

export default (Join)
