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
  auth_status: boolean
}

interface State {
  email: string;
  password: string;
  confirmPassHelper: string;
  auth_status: boolean
}

class SignInPrompt extends React.Component <Props, State> {
  constructor(props: any)
  {
    super(props)

    this.state = {
      confirmPassHelper: "",
      email: "",
      password: "",
      auth_status: false,
    };

    this.checkSignIn = this.checkSignIn.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
    this.pushReset = this.pushReset.bind(this)
  }

  handleChange(event: any) {
    this.setState({[event.target.id]: event.target.value} as any);
  };

  checkSignIn(event: any)
  {
    if (event.keyCode === 13) {
      this.handleSignIn()
    }
  }

  pushReset()
  {
    history.push('/reset')
  }

  handleSignIn()
  {
    this.setState({
      confirmPassHelper: ""
    })

    if (this.state.email === "" || this.state.password === "")
    {
      this.setState({ confirmPassHelper: "Missing required field(s)"})
      return
    }


    if (validator.validate(this.state.email) === false)
    {
      this.setState({ confirmPassHelper: "Invalid email address"})
      return
    }

    axios.post(`${process.env.REACT_APP_RANKED_POLL_API_URI}/api/signin`, {
      params: {
        email: this.state.email.toUpperCase(),
        password: this.state.password,
      }
    })
    .then((response) => {
      if (response.data.allow === true)
      {
        var token = response.data.token
        var user = response.data.user
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);

        store.dispatch(getAuthStatus(true))
        store.dispatch(getCurrentUser(response.data.user))
      }
      else
      {
        if (response.data.message)
        {
          this.setState({ confirmPassHelper: response.data.message})
        }
        else
        {
          this.setState({ confirmPassHelper: "Invalid email or password"})
        }
      }
    })
    .catch((error) => {
      this.setState({ confirmPassHelper: "Invalid email or password"})
    })

  }

  public render() {
    if (this.props.auth_status === true) {
      return <Redirect to='/home' />
    }
    return (
      <div>
        <div className="formContainer">
          <div className="headerTwo promptTitle">Sign In</div>
          <div onChange={this.handleChange} onKeyDown={(e) => this.checkSignIn(e)}>
            <div>Email</div>
            <input className="formInput" type="email" name="email" id="email" />
          </div>
          <div onChange={this.handleChange} onKeyDown={(e) => this.checkSignIn(e)}>
            <div>Password</div>
            <input className="formInput" type="password" name="password" id="password" />
            <div id="confirmPassHelper">{this.state.confirmPassHelper}</div>
          </div>
          <div className="forgotLink" onClick={this.pushReset}>Forgot?</div>
          <button className="genericButton center" onClick={() => this.handleSignIn()}>Submit</button>
        </div>
      </div>
  )}
}

const mapStateToProps = (state: State) => ({
  auth_status: state.auth_status
});

export default connect(mapStateToProps)(SignInPrompt);
