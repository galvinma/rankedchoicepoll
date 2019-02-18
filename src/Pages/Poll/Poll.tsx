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
  title: string;
  poll_items: string[]
  auth_status: boolean
}

class Poll extends React.Component <Props, State> {
  constructor(props: any)
  {
    super(props)

    this.state = {
      title: "",
      poll_items: [],
      auth_status: false,
    };

    this.handleReorder = this.handleReorder.bind(this)
  }

  componentDidMount()
  {
    var id = window.location.pathname.split("/").pop()
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
      })
    })
  }

  handleReorder(list: any)
  {
    this.setState({
      poll_items: list,
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

    return (
      <div>
          <InternalNavbar />
          <div>{this.state.title}</div>

          <DraggableList
            reorderDraggableList = {reorderDraggableList.bind(this)}
            handleReorder = {this.handleReorder}
            poll_items = {this.state.poll_items}/>
      </div>
  )}
}

const mapStateToProps = (state: State) => ({
  auth_status: state.auth_status
});

export default connect(mapStateToProps)(Poll);
