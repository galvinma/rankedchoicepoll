import * as React from "react";
import { Redirect, Link } from 'react-router-dom';
import history from '../.././history';
import axios from 'axios';

// redux
import store from '../.././Store/store'
const { connect } = require("react-redux");
import {getAuthStatus, getCurrentUser} from '../.././Actions/actions'

// functions
import { checkAuth } from '../.././Utils/checkauth'
import { reorderDraggableList } from '../.././Utils/reorderdraggablelist'
import { checkMembership } from '../.././Utils/checkmembership'
import { addUserToPoll } from '../.././Utils/addusertopoll'

// css
import '../.././App.css'
import './Poll.css'

// components
import InternalNavbar from '../../Components/Navbar/InternalNavbar/InternalNavbar'
import DraggableList from '../../Components/List/DraggableList'

// Props / State
interface Props {
  auth_status: boolean
}

interface State {
  title: string,
  admin_id: string,
  poll_id: string,
  poll_items: string[],
  selected: string[],
  options: number,
  auth_status: boolean,
  intervalId: number,
  members: string[],
}

class Poll extends React.Component <Props, State> {
  constructor(props: any)
  {
    super(props)

    this.state = {
      title: "",
      admin_id: "",
      poll_id: "",
      poll_items: [],
      selected: [],
      options: 0,
      auth_status: false,
      intervalId: 0,
      members: [],
    };

    this.closePoll = this.closePoll.bind(this)
    this.handleReorder = this.handleReorder.bind(this)
    this.handleVote = this.handleVote.bind(this)
    this.watchPoll = this.watchPoll.bind(this)
    this.addUser = this.addUser.bind(this)
  }

  componentWillUnmount()
  {
    clearInterval(this.state.intervalId);
  }

  componentDidMount()
  {
    const id = window.location.pathname.split("/").pop() || ""
    axios.post(`${process.env.REACT_APP_RANKED_POLL_API_URI}/api/returnpoll`, {
      params: {
        poll_id: id
      }
    })
    .then((response) =>
    {
      let count = 0
      let data = response.data.poll_items
      let ret: any[] = []

      data.forEach((item: any) => {
        ret.push({id: String(count), content: item})
        count++
      })

      this.setState({
        title: response.data.title,
        poll_items: ret,
        poll_id: id,
        admin_id: response.data.admin_id,
        options: response.data.options,
        members: response.data.members
      }, () => {
        this.watchPoll()

        console.log(this.state.members)
        console.log(localStorage.getItem('user'))
        console.log(checkMembership(this.state.members, localStorage.getItem('user')))
        if (checkMembership(this.state.members, localStorage.getItem('user')) === false)
        {
          console.log('adding member...')
          this.addUser(this.state.poll_id, localStorage.getItem('user'))
        }
      })
    })
    .catch((err) =>
    {
      console.log(err)
    })
  }

  public addUser(poll_id: any, user_id: any)
  {
    addUserToPoll(poll_id, user_id)
  }

  public closePoll()
  {
    axios.post(`${process.env.REACT_APP_RANKED_POLL_API_URI}/api/closepoll`, {
      params: {
        poll_id: this.state.poll_id
      }
    })
    .then((response) =>
    {
      if (response.data.status === false)
      {
        history.push(`/result/${this.state.poll_id}`)
      }
    })
  }

  public handleReorder(list: any, id: any)
  {
    this.setState({
      [id]: list
    } as Pick<State, keyof State>)
  }

  public handleVote()
  {
    let vote = this.state.selected.slice(0,this.state.options)
    axios.post(`${process.env.REACT_APP_RANKED_POLL_API_URI}/api/castvote`, {
      params: {
        poll_id: this.state.poll_id,
        user_id: localStorage.getItem('user'),
        vote: vote,
      }
    })
    .then((response) => {
      console.log(response)
    })
  }

  public watchPoll()
  {
    let intervalId: number = window.setInterval(() =>
    {
      axios.post(`${process.env.REACT_APP_RANKED_POLL_API_URI}/api/returnpoll`, {
        params: {
          poll_id: this.state.poll_id
        }
      })
      .then((response) =>
      {
        if (response.data.status === false)
        {
          history.push(`/result/${this.state.poll_id}`)
        }
      })
    }, 1000)

    this.setState({intervalId: intervalId});
  }

  public render() {
    if (store.getState().auth_status === false)
     {
       checkAuth()
       .then(function(){
         if (store.getState().auth_status.auth_status === false || store.getState().auth_status.auth_status === undefined)
         {
           history.push('/')
         }
       })
       .catch(function(error)
       {
         history.push('/')
       })
     }

    let close: any
    if (this.state.admin_id === localStorage.getItem('user'))
    {
      close = <button className="pollButton" onClick={() => this.closePoll()}>Close Poll</button>
    }

    let vote: any
    if (true)
    {
      vote = <button className="pollButton" onClick={() => this.handleVote()}>Vote</button>
    }

    return (
      <div>
        <InternalNavbar />
        <div className="pollPageContainer">
          <div className="pollTitle headerOne">{this.state.title}</div>
          <div className="listLabels">
            <div className="listLabel headerTwo">Poll Entries</div>
            <div className="listLabel headerTwo">My Votes</div>
          </div>
          <DraggableList
            id = "poll_items"
            className="draggableList"
            reorderDraggableList = {reorderDraggableList.bind(this)}
            handleReorder = {this.handleReorder}
            poll_items = {this.state.poll_items}
            selected = {this.state.selected}
            options = {this.state.options}/>
          <div className="pollButtonContainer">
            <div>{close}</div>
            <div>{vote}</div>
          </div>
        </div>
      </div>
  )}
}

const mapStateToProps = (state: State) => ({
  auth_status: state.auth_status
});

export default connect(mapStateToProps)(Poll);
