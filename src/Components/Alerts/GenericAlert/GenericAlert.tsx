import * as React from "react";
import { Alert } from 'reactstrap';

// css
import '../../.././App.css'
import '.././Alerts.css'

// redux
import store from '../../.././Store/store'
const {connect} = require("react-redux");

// Props / State
interface Props {
  auth_status: boolean
  alert_message: string;
  alert_color: string;
}

interface State {
  auth_status: boolean;
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
      auth_status: false,
    };
  }

  public render() {

    let alert: any
    if (store.getState().alert_message !== "")
    {
      alert =
      <div className="footer">
        <div className="alertContainer" style={{backgroundColor: store.getState().alert_color}}>
          <div className="alertText">{store.getState().alert_message}</div>
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
  auth_status: state.auth_status,
  alert_message: state.alert_message,
  alert_color: state.alert_color
});

export default connect(mapStateToProps)(GenericAlert);
