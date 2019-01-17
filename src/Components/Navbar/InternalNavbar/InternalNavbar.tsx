import * as React from "react";

// css
import '../../.././App.css'
import './InternalNavbar.css'

export default class InternalNavbar extends React.Component<any, any>
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
      <div className="navbar-left">
        <div className="navbar-left-entries">
          <a href="/home">Logo</a>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-right-entries">
          <a href="/">Sign Out</a>
        </div>
      </div>
    </div>
  )}
}
