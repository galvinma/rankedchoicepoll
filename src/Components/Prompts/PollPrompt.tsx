import * as React from "react";
import history from '../.././history';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// css
import '../.././App.css'

// redux
import store from '../.././Store/store'
const { connect } = require("react-redux");
import {getAuthStatus, getCurrentUser} from '../.././Actions/actions'

// Props / State
interface Props {
  auth_status: boolean
}

interface State {
  title: string;
  confirmPassHelper: string;
  auth_status: boolean
}

class PollPrompt extends React.Component <Props, State> {
  constructor(props: any)
  {
    super(props)

    this.state = {
      confirmPassHelper: "",
      title: "",
      auth_status: false,
    };

    this.checkCreation = this.checkCreation.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleNewPoll = this.handleNewPoll.bind(this)
  }

  handleChange(event: any) {
    this.setState({[event.target.id]: event.target.value} as any);
  };

  checkCreation(event: any)
  {
    if (event.keyCode === 13) {
      this.handleNewPoll()
    }
  }

  handleNewPoll()
  {
    this.setState({
      confirmPassHelper: ""
    })

    if (this.state.title === "")
    {
      this.setState({ confirmPassHelper: "Missing required field(s)"})
      return
    }

    axios.post(`${process.env.REACT_APP_RANKED_POLL_API_URI}/api/newpoll`, {
      params: {
        title: this.state.title,
        user_id: localStorage.getItem('user'),
      }
    })
    .then((response) => {
      if (response.data.allow === true)
      {
        history.push(`/poll/${response.data.poll_id}`)
      }
      else
      {
        // handle failure here
      }
    })

  }

  public render() {
    if (store.getState().auth_status === false) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <Form>
          <FormGroup onChange={this.handleChange} onKeyDown={(e) => this.checkCreation(e)}>
            <Label for="title">Poll Title</Label>
            <Input type="text" name="title" id="title" />
          </FormGroup>
          <Button onClick={() => this.handleNewPoll()}>Create New Poll</Button>
        </Form>
      </div>
  )}
}

const mapStateToProps = (state: State) => ({
  auth_status: state.auth_status
});

export default connect(mapStateToProps)(PollPrompt);
