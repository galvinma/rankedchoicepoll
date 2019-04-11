import * as React from "react";
import { Alert } from 'reactstrap';

// css
import '../../.././App.css'
import '.././Alerts.css'

// redux
import store from '../../.././Store/store'
const {connect} = require("react-redux");
import {getAlertColor, getAlertMessage} from '../../.././Actions/actions'

// Props / State
interface Props {
  alert_message: string;
  alert_color: string;
}

interface State {
  alert_message: string;
  alert_color: string;
}

class GenericAlert extends React.Component <Props, State> {
  constructor(props: any)
  {
    super(props)

    this.state = {
      alert_message: "",
      alert_color: "",
    };

    this.hideAlert = this.hideAlert.bind(this)
  }

  public hideAlert()
  {
    store.dispatch(getAlertColor(""))
    store.dispatch(getAlertMessage(""))
  }

  public render() {

    let alert: any
    if (store.getState().alert_message !== "")
    {
      alert =
      <div className="footer">
        <div className="alertContainer" style={{backgroundColor: store.getState().alert_color}}>
          <div className="alertText">{store.getState().alert_message}</div>
          <div className="close" onClick={this.hideAlert}>x</div>
        </div>
      </div>
    }

    return (
      <div>
        {alert}
      </div>
  )}
}

const mapStateToProps = (state: State) => ({
  alert_message: state.alert_message,
  alert_color: state.alert_color
});

export default connect(mapStateToProps)(GenericAlert);
