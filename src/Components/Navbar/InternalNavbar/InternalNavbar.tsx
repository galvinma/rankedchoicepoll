import * as React from "react";
import { Link } from 'react-router-dom';
import history from '../../.././history';

// css
import '../../.././App.css'
import '.././NavBar.css'

// redux
import store from '../../.././Store/store'
import {resetStore} from '../../.././Actions/actions'

// Images
var check = require('../../.././Images/check.svg')

export default class InternalNavbar extends React.Component<any, any>
{
  constructor(props: any)
  {
    super(props)
    this.state = {
       isOpen: false
    }

    this.toggle = this.toggle.bind(this);
    this.handleLogoClick = this.handleLogoClick.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  public toggle()
  {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  public handleLogoClick()
  {
    history.push('/home')
  }

  public handleSignOut()
  {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    store.dispatch(resetStore())
  }

  public render()
  {
    return(
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-left-entries">
          <img src={check} className="logo" onClick={this.handleLogoClick}/>
          <Link to="/home" className="linkStyle logoText">Ranked Choice Poll</Link>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-right-entries">
          <Link className="linkStyle" to="/" onClick={this.handleSignOut}>Sign Out</Link>
        </div>
      </div>
    </div>
  )}
}
