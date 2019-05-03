import * as React from "react";
import axios from 'axios';
import history from '../.././history';

// css
import '../.././App.css'
import './Prompt.css'

// Props / State
interface Props {}

interface State {
  password: string;
  confirmPass: string;
  confirmPassHelper: string;
}

class NewPasswordPrompt extends React.Component <Props, State> {
  constructor(props: any)
  {
    super(props)

    this.state = {
      confirmPassHelper: "",
      confirmPass: "",
      password: "",
    };

    this.checkNewPassword = this.checkNewPassword.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleNewPassword  = this.handleNewPassword.bind(this)
  }

  handleChange(event: any) {
    this.setState({[event.target.id]: event.target.value} as any);
  };

  checkNewPassword(event: any)
  {
    if (event.keyCode === 13) {
      this.handleNewPassword()
    }
  }

  handleNewPassword()
  {
    this.setState({
      confirmPassHelper: ""
    })

    if (this.state.password === "" ||
        this.state.confirmPass === "")
    {
      this.setState({ confirmPassHelper: "Missing required field(s)"})
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

    const split: string[] = window.location.href.split("/")
    const hash: string = split[split.length-1]
    const id: string = split[split.length-2]

    axios.post(`${process.env.REACT_APP_RANKED_POLL_API_URI}/api/newpass`, {
      params: {
        user_id: id,
        token_hash: hash,
        new_password: this.state.password,
      }
    })
    .then((response) => {
      if (response.data.message)
      {
        this.setState({ confirmPassHelper: response.data.message})
      }
      else
      {
        this.setState({ confirmPassHelper: "Unable to reset password"})
      }
    })
    .catch((error) => {
      this.setState({ confirmPassHelper: "Unable to reset password"})
    })
  }

  public render() {
    return (
      <div>
        <div className="formContainer">
          <div className="headerTwo promptTitle">Reset Password</div>
          <div onChange={this.handleChange} onKeyDown={(e) => this.checkNewPassword(e)}>
            <div>Password</div>
            <input className="formInput" type="password" name="password" id="password" />
          </div>
          <div onChange={this.handleChange} onKeyDown={(e) => this.checkNewPassword(e)}>
            <div>Confirm Password</div>
            <input className="formInput" type="password" name="confirmPass" id="confirmPass" />
            <div id="confirmPassHelper">{this.state.confirmPassHelper}</div>
          </div>
          <button className="genericButton center" onClick={() => this.handleNewPassword()}>Change Password</button>
        </div>
      </div>
  )}
}


export default (NewPasswordPrompt);
