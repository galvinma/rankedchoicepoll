import * as React from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import history from '../.././history';

// css
import '../.././App.css'
import './Prompt.css'

// email val
var validator = require("email-validator");

// redux
import store from '../.././Store/store'
const { connect } = require("react-redux");
import {getAuthStatus, getCurrentUser} from '../.././Actions/actions'

// Props / State
interface Props {
}

interface State {
  email: string;
  helper: string;
}

class ResetPrompt extends React.Component <Props, State> {
  constructor(props: any)
  {
    super(props)

    this.state = {
      helper: "",
      email: "",
    };

    this.checkReset = this.checkReset.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleChange(event: any) {
    this.setState({[event.target.id]: event.target.value} as any);
  };

  checkReset(event: any)
  {
    if (event.keyCode === 13) {
      this.handleReset()
    }
  }

  handleReset()
  {
    this.setState({
      helper: ""
    })

    if (this.state.email === "")
    {
      this.setState({ helper: "Missing required field(s)"})
      return
    }


    if (validator.validate(this.state.email) === false)
    {
      this.setState({ helper: "Invalid email address"})
      return
    }

    axios.post(`${process.env.REACT_APP_RANKED_POLL_API_URI}/api/reset`, {
      params: {
        email: this.state.email.toUpperCase(),
      }
    })
    .then((response) => {
      if (response.data.success === true)
      {
        this.setState({ helper: response.data.message})
      }
      else if (response.data.success === false)
      {
        this.setState({ helper: response.data.message})
      }
      else
      {
        this.setState({ helper: "Unable to reset password."})
      }
    })
    .catch((error) => {
        this.setState({ helper: "Unable to reset password."})
    })

  }

  public render() {
    return (
      <div>
        <div className="formContainer">
          <div className="headerTwo promptTitle">Reset Password</div>
          <div onChange={this.handleChange} onKeyDown={(e) => this.checkReset(e)}>
            <div>Email</div>
            <input className="formInput" type="email" name="email" id="email" />
            <div id="helper">{this.state.helper}</div>
          </div>
          <button className="genericButton center" onClick={() => this.handleReset()}>Submit</button>
        </div>
      </div>
  )}
}

export default (ResetPrompt);
