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
import { tallyVotes } from '../.././Utils/tallyvotes'

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
    };

    this.handleReorder = this.handleReorder.bind(this)
    this.closePoll = this.closePoll.bind(this)
    this.handleVote = this.handleVote.bind(this)
  }

  componentDidMount()
  {
    var id = window.location.pathname.split("/").pop() || ""
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
      })
    })
  }

  closePoll()
  {
    tallyVotes(this.state.poll_id)
    .then((response) => {
      console.log(response)
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

  public render() {
    if (store.getState().auth_status === false)
     {
       checkAuth()
       .then(function(){
         if (store.getState().auth_status.auth_status === false)
         {
           return <Redirect to='/' />
         }
       })
       .catch(function(error)
       {
         return <Redirect to='/' />
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
          <div className="pollTitle">{this.state.title}</div>
          <DraggableList
            id = "poll_items"
            className="draggableList"
            reorderDraggableList = {reorderDraggableList.bind(this)}
            handleReorder = {this.handleReorder}
            poll_items = {this.state.poll_items}
            selected = {this.state.selected}
            options = {this.state.options}/>
          <div>{close}</div>
          <div>{vote}</div>
        </div>
      </div>
  )}
}

const mapStateToProps = (state: State) => ({
  auth_status: state.auth_status
});

export default connect(mapStateToProps)(Poll);
