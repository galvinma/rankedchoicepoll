import * as React from "react";
import { Link } from 'react-router-dom';

// css
import '../../.././App.css'
import './ExternalNavbar.css'

export default class ExternalNavbar extends React.Component<any, any>
{
  constructor(props: any)
  {
    super(props)
    this.state = {
       isOpen: false
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle()
  {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render()
  {
    return(
    <div className="navbar">
      <div className="navbar-right">
        <div className="navbar-right-entries">
          <Link to="/signin" className="linkStyle">Sign In</Link>
          <Link to="/join" className="linkStyle join">Join</Link>
        </div>
      </div>
    </div>
  )}
}
