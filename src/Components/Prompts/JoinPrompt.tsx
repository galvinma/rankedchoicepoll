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
  confirmPass: string;
  firstname: string;
  lastname: string;
  confirmPassHelper: string;
  auth_status: boolean
}

class JoinPrompt extends React.Component <Props, State> {
  constructor(props: any)
  {
    super(props)

    this.state = {
      confirmPassHelper: "",
      confirmPass: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      auth_status: false,
    };

    this.checkJoin = this.checkJoin.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleJoin = this.handleJoin.bind(this)
    this.pushSignIn = this.pushSignIn.bind(this)
  }

  handleChange(event: any) {
    this.setState({[event.target.id]: event.target.value} as any);
  };

  checkJoin(event: any)
  {
    if (event.keyCode === 13) {
      this.handleJoin()
    }
  }

  pushSignIn()
  {
    history.push('/signin')
  }

  handleJoin()
  {
    this.setState({
      confirmPassHelper: ""
    })

    if (this.state.email === "" ||
        this.state.password === "" ||
        this.state.confirmPass === "" ||
        this.state.firstname === "" ||
        this.state.lastname === "")
    {
      this.setState({ confirmPassHelper: "Missing required field(s)"})
      return
    }


    if (validator.validate(this.state.email) === false)
    {
      this.setState({ confirmPassHelper: "Invalid email address"})
      return
    }

    if (this.state.password.length < 8)
    {
      this.setState({ confirmPassHelper: "Password must be at least 8 characters"})
      return
    }

    if (this.state.password !== this.state.confirmPass)
    {
      this.setState({ confirmPassHelper: "Password and confirmation must match"})
      return
    }

    axios.post(`${process.env.REACT_APP_RANKED_POLL_API_URI}/api/join`, {
      params: {
        email: this.state.email.toUpperCase(),
        password: this.state.password,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
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
          this.setState({ confirmPassHelper: "Unable to register user"})
        }
      }
    })

  }

  public render() {
    if (this.props.auth_status === true) {
      return <Redirect to='/home' />
    }
    return (
      <div>
        <div className="formContainer">
          <div className="headerTwo promptTitle">Create a free account</div>
          <div className="bodyText signInText">Already a member? Sign in <div className="signInLink" onClick={this.pushSignIn}>here</div></div>
          <div onChange={this.handleChange} onKeyDown={(e) => this.checkJoin(e)}>
            <div>First Name</div>
            <input className="formInput" type="text" name="firstname" id="firstname" />
          </div>
          <div onChange={this.handleChange} onKeyDown={(e) => this.checkJoin(e)}>
            <div>Last Name</div>
            <input className="formInput" type="text" name="lastname" id="lastname" />
          </div>
          <div onChange={this.handleChange} onKeyDown={(e) => this.checkJoin(e)}>
            <div>Email</div>
            <input className="formInput" type="email" name="email" id="email" />
          </div>
          <div onChange={this.handleChange} onKeyDown={(e) => this.checkJoin(e)}>
            <div>Password</div>
            <input className="formInput" type="password" name="password" id="password" />
          </div>
          <div onChange={this.handleChange} onKeyDown={(e) => this.checkJoin(e)}>
            <div>Confirm Password</div>
            <input className="formInput" type="password" name="confirmPass" id="confirmPass" />
            <div id="confirmPassHelper">{this.state.confirmPassHelper}</div>
          </div>
          <button className="genericButton center" onClick={() => this.handleJoin()}>Submit</button>
        </div>
      </div>
  )}
}

const mapStateToProps = (state: State) => ({
  auth_status: state.auth_status
});

export default connect(mapStateToProps)(JoinPrompt);
