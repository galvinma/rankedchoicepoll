import * as React from "react";
import history from '../.././history';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';

// components
import GenericAlert from '../../Components/Alerts/GenericAlert/GenericAlert'

// css
import '../.././App.css'
import './Prompt.css'

// functions
import { checkArrayForValue } from '../.././Utils/checkarrayforvalue'
import { dispatchAlert } from '../.././Utils/dispatchalert'

// redux
import store from '../.././Store/store'
const {connect} = require("react-redux");
import {getAuthStatus, getCurrentUser} from '../.././Actions/actions'

// email val
var validator = require("email-validator");

// Props / State
interface Props {
  auth_status: boolean
}

interface State {
  options: string;
  title: string;
  entry: string;
  auth_status: boolean;
  poll_items: string[];
  members: string[];
  promptHelperText: string;
}

class PollPrompt extends React.Component <Props, State> {
  constructor(props: any)
  {
    super(props)

    this.state = {
      options: "",
      entry: "",
      title: "",
      auth_status: false,
      poll_items: [],
      members: [],
      promptHelperText: "",
    };

    this.checkCreation = this.checkCreation.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleNewPoll = this.handleNewPoll.bind(this)
    this.pushListItem = this.pushListItem.bind(this)
    this.pushMember = this.pushMember.bind(this)
    this.handleOptions = this.handleOptions.bind(this)
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

  handleOptions(event: any) {
    this.setState({
      promptHelperText: ""
    })

    if (event.target.value === "")
    {
      return
    }

    let opts: number = parseInt(event.target.value)
    if (isNaN(opts) === true || typeof opts !== "number" || Number(event.target.value) !== parseInt(event.target.value))
    {
      this.setState({
        promptHelperText: "Poll item option must be an integer"
      })
      return
    }
    else if (opts < 1 || opts > this.state.poll_items.length)
    {
      this.setState({
        promptHelperText: "Poll item option must be less than list length and greater than zero"
      })
      return
    }
    else
    {
      this.setState({[event.target.id]: event.target.value} as any);
    }
  };

  pushListItem(event: any)
  {
    if (event.keyCode === 13) {
      event.preventDefault()

      this.setState({
        promptHelperText: ""
      })

      // check if item is empty && if item is already in list
      if (event.target.value === "")
      {
        this.setState({
          promptHelperText: "Poll item cannot be empty"
        })
        return
      }
      else if (checkArrayForValue(this.state.poll_items, event.target.value) === true)
      {
        this.setState({
          promptHelperText: "Poll item already in list"
        })
        return
      }
      else
      {
        let ret = this.state.poll_items
        ret.push(event.target.value)

        this.setState({
          poll_items: ret,
          entry: "",
        })
        event.target.value = ""
      }
    }
  }

  pushMember(event: any)
  {
    if (event.keyCode === 13) {
      event.preventDefault()

      this.setState({
        promptHelperText: ""
      })

      // check if item is empty && if item is already in list
      if (event.target.value === "")
      {
        this.setState({
          promptHelperText: "Member field cannot be empty"
        })
        return
      }
      else if (checkArrayForValue(this.state.members, event.target.value) === true)
      {
        this.setState({
          promptHelperText: "Email already in list"
        })
        return
      }
      else if (validator.validate(event.target.value) === false)
      {
        this.setState({ promptHelperText: "Invalid email address"})
        return
      }
      else
      {
        let ret = this.state.members
        ret.push(event.target.value)

        this.setState({
          members: ret,
          entry: "",
        })

        event.target.value = ""
      }
    }
  }

  handleNewPoll()
  {
    this.setState({
      promptHelperText: ""
    })

    if (this.state.title === "" || this.state.options === "")
    {
      this.setState({ promptHelperText: "Missing required field(s)"})
      return
    }
    axios.post(`${process.env.REACT_APP_RANKED_POLL_API_URI}/api/newpoll`, {
      params: {
        admin_id: localStorage.getItem('user'),
        options: this.state.options,
        poll_items: this.state.poll_items,
        title: this.state.title,
        members: this.state.members,
      }
    })
    .then((response) => {
      if (response.data.allow === true)
      {
        history.push(`/poll/${response.data.poll_id}`)
      }
    })
    .catch((error) => {
        dispatchAlert(store.getState().error, "Unable to reach server.", "INFINITE")
    })
  }

  returnListItem(i: string)
  {
    return (<li key={i} className="pollItem">{i}</li>)
  }

  public render() {
    return (
      <div>
        <div className="formContainer">
          <div onChange={this.handleChange} onKeyDown={(e) => this.checkCreation(e)}>
            <div>Poll Title</div>
            <input className="formInput" type="text" name="title" id="title" />
          </div>
          <div>
            <div>Poll Entries</div>
            <input className="formInput" type="text" name="entry" id="entry" onKeyDown={(e) => this.pushListItem(e)} />
          </div>
          <ul className="pollItemsContainer">
            {this.state.poll_items.map(this.returnListItem)}
          </ul>
          <div>
            <div>Poll Members</div>
            <input className="formInput" type="text" name="mems" id="mems" onKeyDown={(e) => this.pushMember(e)} />
          </div>
          <ul className="pollItemsContainer">
            {this.state.members.map(this.returnListItem)}
          </ul>
          <div onChange={this.handleOptions}>
            <div>Number of Options</div>
            <input className="formInput" type="text" name="options" id="options" />
          </div>
          <div>
            <div id="promptHelperText" className="helperText">{this.state.promptHelperText}</div>
          </div>
          <button className="genericButton" onClick={() => this.handleNewPoll()}>Create New Poll</button>
        </div>
      </div>
  )}
}

const mapStateToProps = (state: State) => ({
  auth_status: state.auth_status
});

export default connect(mapStateToProps)(PollPrompt);
