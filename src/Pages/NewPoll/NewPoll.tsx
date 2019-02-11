import * as React from "react";
import history from '../.././history';

// css
import '../.././App.css'
import './NewPoll.css'

// components
import InternalNavbar from '../../Components/Navbar/InternalNavbar/InternalNavbar'
import PollPrompt from '../../Components/Prompts/PollPrompt'

class NewPoll extends React.Component {
  public render() {
    return (
      <div>
          <InternalNavbar />
          <PollPrompt />
      </div>
  )}
}

export default (NewPoll)
