import * as React from "react";
import { Link } from 'react-router-dom';
import ReactSVG from 'react-svg'

// css
import '../../.././App.css'
import './InternalNavbar.css'

// redux
import store from '../../.././Store/store'
import {resetStore} from '../../.././Actions/actions'

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
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-right-entries">
          <Link to="/" onClick={()=>store.dispatch(resetStore())}>Sign Out</Link>
        </div>
      </div>
    </div>
  )}
}
