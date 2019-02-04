import * as React from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// css
import '../.././App.css'
import './JoinPrompt.css'

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
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleJoin = this.handleJoin.bind(this)
  }

  handleChange(event: any) {
    this.setState({[event.target.id]: event.target.value} as any);
  };

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
    console.log(this.props.auth_status)
    if (this.props.auth_status === true) {
      return <Redirect to='/home' />
    }
    return (
      <div>
        <Form>
          <FormGroup onChange={this.handleChange}>
            <Label for="firstname">First Name</Label>
            <Input type="text" name="firstname" id="firstname" />
          </FormGroup>
          <FormGroup onChange={this.handleChange}>
            <Label for="lastname">Last Name</Label>
            <Input type="text" name="lastname" id="lastname" />
          </FormGroup>
          <FormGroup onChange={this.handleChange}>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" />
          </FormGroup>
          <FormGroup onChange={this.handleChange}>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" />
          </FormGroup>
          <FormGroup onChange={this.handleChange}>
            <Label for="confirmPass">Confirm Password</Label>
            <Input type="password" name="confirmPass" id="confirmPass" />
            <FormText id="confirmPassHelper">{this.state.confirmPassHelper}</FormText>
          </FormGroup>
          <Button onClick={() => this.handleJoin()}>Submit</Button>
        </Form>
      </div>
  )}
}

const mapStateToProps = (state: any) => ({
  auth_status: state.auth_status
});

export default connect(mapStateToProps)(JoinPrompt);
