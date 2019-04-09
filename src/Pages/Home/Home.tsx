import * as React from "react";
import { Redirect, Link } from 'react-router-dom';
import history from '../.././history';
import axios from 'axios';

// css
import '../.././App.css'
import './Home.css'

// functions
import { checkAuth } from '../.././Utils/checkauth'
import { dispatchAlert } from '../.././Utils/dispatchalert'

// components
import InternalNavbar from '../../Components/Navbar/InternalNavbar/InternalNavbar'
import GenericAlert from '../../Components/Alerts/GenericAlert/GenericAlert'

// redux
import store from '../.././Store/store'
const { connect } = require("react-redux");
import { getAuthStatus } from '../.././Actions/actions'

// images
var voteHand = require('../.././Images/voteHand.svg')
var emptyCheckBox = require('../.././Images/emptyCheckBox.svg')
var checkRed = require('../.././Images/checkRed.svg')

// Props / State
interface Props {
  auth_status: boolean
}

interface State {
  auth_status: boolean;
  active_polls: UserPolls[];
  closed_polls: UserPolls[];
  firstname: string;
}

interface UserPolls {
  poll_id: string;
  admin_name: string;
  title: string;
  status: string;
  voted: boolean;
}

class Home extends React.Component <Props, State> {
  constructor(props: any)
  {
    super(props)
    this.state = {
      auth_status: false,
      firstname: "",
      active_polls: [],
      closed_polls: [],
    }

    this.handlePush = this.handlePush.bind(this)
    this.returnListItem = this.returnListItem.bind(this)
    this.deletePoll = this.deletePoll.bind(this)
  }

  componentDidMount()
  {
    axios.post(`${process.env.REACT_APP_RANKED_POLL_API_URI}/api/returnuserpolls`, {
      params: {
        user_id: localStorage.getItem('user'),
      }
    })
    .then((response) => {
      if (response.data.success === false)
      {
        dispatchAlert(store.getState().error, response.data.message, "INFINITE")
      }
      else
      {
        if (response.data.active_polls && response.data.closed_polls)
        {
          this.setState({
            active_polls: response.data.active_polls,
            closed_polls: response.data.closed_polls,
            firstname: response.data.firstname
          })
        }
      }
    })
    .catch((error) => {
      dispatchAlert(store.getState().error, "Unable to fetch user data from server.", "INFINITE")
    })
  }

  public handlePush(event: any, status: string)
  {
    if (String(status) === 'false')
    {
      history.push(`/result/${event.target.id}`)
    }
    else
    {
      history.push(`/poll/${event.target.id}`)
    }
  }

  public deletePoll(event: any, poll_id: string)
  {
    axios.post(`${process.env.REACT_APP_RANKED_POLL_API_URI}/api/deletepollfromuser`, {
      params: {
        user_id: localStorage.getItem('user'),
        poll_id: poll_id
      }
    })
    .then((response) => {
      if (response.data.success === false)
      {
        dispatchAlert(store.getState().error, response.data.message, "INFINITE")
      }
      else
      {
        let activeKeys: any[] = Object.keys(this.state.active_polls)
        let closedKeys: any[] = Object.keys(this.state.closed_polls)
        let active = this.state.active_polls
        let closed = this.state.closed_polls
        for (var i=0; i<activeKeys.length; i++)
        {
          if (active[activeKeys[i]]["poll_id"] === poll_id)
          {
            delete active[activeKeys[i]]
          }
        }

        for (var i=0; i<closedKeys.length; i++)
        {
          if (closed[closedKeys[i]]["poll_id"] === poll_id)
          {
            delete closed[closedKeys[i]]
          }
        }

        this.setState({
          active_polls: active,
          closed_polls: closed,
        })
      }
    })
    .catch((error) => {
      dispatchAlert(store.getState().error, "Unable to fetch user data from server.", "INFINITE")
    })
  }

  public returnListItem(i: UserPolls, index: any)
  {
    let icon
    if (i.voted === true)
    {
      icon = checkRed
    }
    else
    {
      icon = emptyCheckBox
    }

    return (
      <div className="homeLinkContainer" key={i.title+i.poll_id + index}>
        <img className="pollIcon" src={icon}/>
        <div id={i.poll_id} className="pollItem" onClick={(e) => this.handlePush(e, i.status)}>{i.title} by {i.admin_name}</div>
        <div id={i+"_delete"} className="deleteIcon" onClick={(e) => this.deletePoll(e, i.poll_id)}>X</div>
      </div>
    )
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

    return (
      <div>
        <InternalNavbar />
        <div className="bodyPaper primaryBackground">
          <div className="homeContainer">
             <div className="headerContainer">
                <div className="upperContentContainer">
                  <div className="welcomeContainer">
                    <div className="headerOne welcomeText">Welcome, {this.state.firstname}.</div>
                    <div className="bodyText">Create a new poll, view poll results, or participate in one of the polls below.</div>
                  </div>
                  <Link className="headerThree genericButton createPoll" to="/newpoll">Create New Poll</Link>
                </div>
              </div>
             <div className="pollContainer">
               <div>
                  <div className="headerTwo pollHeader">My Active Polls</div>
                  <div className="pollNameContainer primaryBackground">
                    {this.state.active_polls.map(this.returnListItem)}
                  </div>
               </div>
               <div>
                  <div className="headerTwo pollHeader">Closed Polls</div>
                  <div className="pollNameContainer primaryBackground">
                    {this.state.closed_polls.map(this.returnListItem)}
                  </div>
               </div>
                <div className="homeSVGContainer">
                  <img src={voteHand} className="homeImage"/>
                </div>
             </div>
          </div>
        </div>
        <GenericAlert />
      </div>
  )}
}

const mapStateToProps = (state: State) => ({
  auth_status: state.auth_status
});

export default connect(mapStateToProps)(Home);
