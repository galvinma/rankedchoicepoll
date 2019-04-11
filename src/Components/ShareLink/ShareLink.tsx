import * as React from "react";
import { Button } from 'reactstrap';

// css
import '../.././App.css'
import './ShareLink.css'

// redux
import store from '../.././Store/store'
const {connect} = require("react-redux");
import {getAlertColor, getAlertMessage} from '../.././Actions/actions'

// Functions
import { dispatchAlert } from '../.././Utils/dispatchalert'

// Props / State
interface Props {}

interface State {
  linkText: string;
}

class ShareLink extends React.Component <Props, State> {
  constructor(props: any)
  {
    super(props)

    this.state = {
      linkText: ""
    }
    this.getLink = this.getLink.bind(this)
  }

  componentDidMount()
  {
    this.setState({
      linkText: window.location.href
    })
  }

  public getLink(event: any)
  {
    try
    {
      let text = document.getElementById("linkText") as any
      let ta = document.createElement('textarea') as any;
      ta.style.position = 'fixed';
      ta.style.left = '0';
      ta.style.top = '0';
      ta.style.opacity = '0';
      ta.value = text.innerHTML
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);

      dispatchAlert(store.getState().success, "Link copied to clipboard", 5000)
    }
    catch (error)
    {
      dispatchAlert(store.getState().error, "Unable to copy link", 5000)
    }
  }

  public render() {
    return (
      <div>
        <div className="genericButton" onClick={this.getLink}>Copy Link to Clipboard</div>
        <div id="linkText" className="linkText">{this.state.linkText}</div>
      </div>
  )}
}

export default (ShareLink)
