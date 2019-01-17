import * as React from "react";

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

  public toggle()
  {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  public render()
  {
    return(
    <div className="navbar">
      <div className="navbar-right">
        <div className="navbar-right-entries">
          <input className="username-input"/>
          <input className="username-password"/>
          <a href="/home">Sign In</a>  
          <a href="/join">Join</a>
        </div>
      </div>
    </div>
  )}
}
