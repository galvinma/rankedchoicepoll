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

interface State {}

class ShareLink extends React.Component <Props, State> {
  constructor(props: any)
  {
    super(props)
    this.getLink = this.getLink.bind(this)
  }

  public getLink()
  {
    store.dispatch(getAlertColor("#278BE4"))
    store.dispatch(getAlertMessage("Link Copied to Clipboard"))

    setTimeout(() => {
      store.dispatch(getAlertColor(""))
      store.dispatch(getAlertMessage(""))
    }, 3000)
  }

  public render() {
    return (
      <div>
        <div onClick = {this.getLink}>Copy Link to Clipboard</div>
        <div className="linkText"></div>
      </div>
  )}
}

export default (ShareLink)
