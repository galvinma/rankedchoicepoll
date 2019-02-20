import * as React from "react";
import history from '../.././history';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// css
import '../.././App.css'

// redux
import store from '../.././Store/store'
const {connect} = require("react-redux");
import {getAuthStatus, getCurrentUser} from '../.././Actions/actions'

// Props / State
interface Props {
  auth_status: boolean
}

interface State {
  options: string;
  title: string;
  entry: string;
  confirmPassHelper: string;
  auth_status: boolean;
  poll_items: string[];
}

class PollPrompt extends React.Component <Props, State> {
  constructor(props: any)
  {
    super(props)

    this.state = {
      confirmPassHelper: "",
      options: "",
      entry: "",
      title: "",
      auth_status: false,
      poll_items: [],
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
      event.preventDefault()
      this.handleNewPoll()
    }
  }

  pushListItem(event: any)
  {
    if (event.keyCode === 13) {
      event.preventDefault()

      let ret = this.state.poll_items
      ret.push(event.target.value)

      this.setState({
        poll_items: ret,
        entry: "",
      })

      event.target.value = ""
    }
  }

  handleNewPoll()
  {
    this.setState({
      confirmPassHelper: ""
    })

    if (this.state.title === "" || this.state.options === "")
    {
      this.setState({ confirmPassHelper: "Missing required field(s)"})
      return
    }
    axios.post(`${process.env.REACT_APP_RANKED_POLL_API_URI}/api/newpoll`, {
      params: {
        admin_id: localStorage.getItem('user'),
        options: this.state.options,
        poll_items: this.state.poll_items,
        title: this.state.title,
      }
    })
    .then((response) => {
      console.log(response)
      if (response.data.allow === true)
      {
        history.push(`/poll/${response.data.poll_id}`)
      }
    })
  }

  returnListItem(i: string)
  {
    return (
      <div key={i}>
        <div>
          {i}
        </div>
      </div>
    )
  }

  public render() {
    return (
      <div>
        <Form>
          <FormGroup onChange={this.handleChange} onKeyDown={(e) => this.checkCreation(e)}>
            <Label for="title">Poll Title</Label>
            <Input type="text" name="title" id="title" />
          </FormGroup>

          <FormGroup onKeyDown={(e) => this.pushListItem(e)}>
            <Label for="entry">Poll Entries</Label>
            <Input type="text" name="entry" id="entry" />
          </FormGroup>

          <FormGroup onChange={this.handleChange}>
            <Label for="options">Number of Options</Label>
            <Input type="text" name="options" id="options" />
          </FormGroup>

          <div>
            {this.state.poll_items.map(this.returnListItem)}
          </div>

          <Button onClick={() => this.handleNewPoll()}>Create New Poll</Button>
        </Form>
      </div>
  )}
}

const mapStateToProps = (state: State) => ({
  auth_status: state.auth_status
});

export default connect(mapStateToProps)(PollPrompt);
