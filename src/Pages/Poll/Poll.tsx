import * as React from "react";
import history from '../.././history';
import axios from 'axios';

// redux
import store from '../.././Store/store'
const { connect } = require("react-redux");
import {getAuthStatus, getCurrentUser} from '../.././Actions/actions'

// css
import '../.././App.css'
import './Poll.css'

// components
import InternalNavbar from '../../Components/Navbar/InternalNavbar/InternalNavbar'


// Props / State
interface Props {
  auth_status: boolean
}

interface State {
  title: string;
  auth_status: boolean
}

class Poll extends React.Component <Props, State> {
  constructor(props: any)
  {
    super(props)

    this.state = {
      title: "",
      auth_status: false,
    };
  }

  componentDidMount()
  {
    var id = window.location.pathname.split("/").pop()
    axios.post(`${process.env.REACT_APP_RANKED_POLL_API_URI}/api/returnpoll`, {
      params: {
        poll_id: id
      }
    })
    .then((response) =>
    {
      console.log(response)
      this.setState({
        title: response.data.title
      })
    })
  }

  public render() {
    return (
      <div>
          <InternalNavbar />
          <div>{this.state.title}</div>
      </div>
  )}
}

const mapStateToProps = (state: State) => ({
  auth_status: state.auth_status
});

export default connect(mapStateToProps)(Poll);
