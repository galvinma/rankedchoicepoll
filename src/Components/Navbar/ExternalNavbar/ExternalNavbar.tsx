import * as React from "react";
import { Link } from 'react-router-dom';
import history from '../../.././history';

// css
import '../../.././App.css'
import '.././NavBar.css'

// Images
var check = require('../../.././Images/checkRed.svg')

export default class ExternalNavbar extends React.Component<any, any>
{
  constructor(props: any)
  {
    super(props)
    this.state = {
       isOpen: false
    }

    this.toggle = this.toggle.bind(this);
    this.handleLogoClick = this.handleLogoClick.bind(this)
  }

  public toggle()
  {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  public handleLogoClick()
  {
    history.push('/')
  }

  render()
  {
    return(
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-left">
          <div className="navbar-left-entries">
            <img src={check} className="logo" onClick={this.handleLogoClick}/>
            <Link to="/" className="linkStyle logoText">Ranked Choice Poll</Link>
          </div>
        </div>
        <div className="navbar-right">
          <div className="navbar-right-entries">
            <Link to="/signin" className="linkStyle">Sign In</Link>
            <Link to="/join" className="linkStyle join">Join</Link>
          </div>
        </div>
      </div>
    </div>
  )}
}
