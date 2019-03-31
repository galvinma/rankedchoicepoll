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

  public getLink()
  {
    try
    {
      var range = document.createRange() as any
      range.selectNode(document.getElementById('linkText'))
      window.getSelection().addRange(range);
      document.execCommand("copy");

      dispatchAlert(store.getState().success, "Link copied to clipboard")
    }
    catch (error)
    {
      dispatchAlert(store.getState().fail, "Unable to copy link")
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
