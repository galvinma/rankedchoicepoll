import * as React from "react";
import { Button } from 'reactstrap';

// css
import '../.././App.css'
import './ShareLink.css'

// redux
import store from '../.././Store/store'
const {connect} = require("react-redux");
import {getAlertColor, getAlertMessage} from '../.././Actions/actions'

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

  public getLink()
  {
    try
    {
      var range = document.createRange() as any
      console.log(typeof range)
      range.selectNode(document.getElementById('linkText'))
      window.getSelection().addRange(range);
      document.execCommand("copy");

      store.dispatch(getAlertColor("#278BE4"))
      store.dispatch(getAlertMessage("Link copied to clipboard"))

      setTimeout(() => {
        store.dispatch(getAlertColor(""))
        store.dispatch(getAlertMessage(""))
      }, 3000)

    }
    catch (error)
    {
      store.dispatch(getAlertColor("#ED4F32"))
      store.dispatch(getAlertMessage("Unable to copy link"))

      setTimeout(() => {
        store.dispatch(getAlertColor(""))
        store.dispatch(getAlertMessage(""))
      }, 3000)
    }
  }

  public render() {
    return (
      <div>
        <div className="shareLinkContainer">
          <div className="genericButton" onClick={this.getLink}>Copy Link to Clipboard</div>
          <div id="linkText" className="linkText">{this.state.linkText}</div>
        </div>
      </div>
  )}
}

export default (ShareLink)
