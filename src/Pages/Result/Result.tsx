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
import { tallyVotes } from '../.././Utils/tallyvotes'

// css
import '../.././App.css'
import './Result.css'

// components
import InternalNavbar from '../../Components/Navbar/InternalNavbar/InternalNavbar'
import GenericAlert from '../../Components/Alerts/GenericAlert/GenericAlert'
import BarChart from '../../Components/BarChart/BarChart'
import Slider from '../../Components/Slider/Slider'

// Props / State
interface Props {
  auth_status: boolean,
}

interface State {
  title: string,
  admin_id: string,
  poll_id: string,
  poll_items: string[],
  options: number,
  auth_status: boolean,
  leader: string,
  chart_data: any,
  tally: any,
  slider_max: number,
  selected_round: number,
}

class Result extends React.Component <Props, State> {
  constructor(props: any)
  {
    super(props)

    this.state = {
      leader: "",
      auth_status: false,
      title: "",
      poll_items: [],
      poll_id: "",
      admin_id: "",
      options: 0,
      chart_data: {},
      tally: {},
      slider_max: 1,
      selected_round: 1,
    }

    this.changeRound = this.changeRound.bind(this)
  }

  componentDidMount()
  {
    const id: string = window.location.pathname.split("/").pop() || ""
    axios.post(`${process.env.REACT_APP_RANKED_POLL_API_URI}/api/returnpoll`, {
      params: {
        poll_id: id,
        user_id: localStorage.getItem('user'),
      }
    })
    .then((response: any) =>
    {
      let count = 0
      let data = response.data.poll_items
      let ret: any[] = []

      data.forEach((item: any) => {
        ret.push({id: String(count), content: item})
        count++
      })

      tallyVotes(id)
      .then((tallyResponse: any) => {
        const finalResult = tallyResponse[tallyResponse.length-1]
        const tallyKeys: any = Object.keys(finalResult.tally)
        const chartData: any = {}
        tallyKeys.forEach((key: any) => {
          chartData[key] = (finalResult.tally[key] / finalResult.count)
        })

        this.setState({
          title: response.data.title,
          poll_items: ret,
          poll_id: id,
          admin_id: response.data.admin_id,
          options: response.data.options,
          leader: tallyResponse.leader,
          chart_data: chartData,
          tally: tallyResponse,
          slider_max: Object.keys(tallyResponse).length-1,
          selected_round: Object.keys(tallyResponse).length-1,
        })
      })
    })
  }

  public changeRound(value: any)
  {
    const selectedResult = this.state.tally[value]
    const tallyKeys: any = Object.keys(selectedResult.tally)
    const chartData: any = {}
    tallyKeys.forEach((key: any) => {
      chartData[key] = (selectedResult.tally[key] / selectedResult.count)
    })

    console.log(this.state.tally)

    this.setState({
      selected_round: value,
      chart_data: chartData
    })
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
        <div className="pollResultContainer bodyPaper primaryBackground">
          <div className="headerTwo">{this.state.title}</div>
          <div className="pollLeader">{this.state.leader}</div>
          <BarChart
            chart_data={this.state.chart_data} />
          <Slider
            selected_round={this.state.selected_round}
            slider_max={this.state.slider_max}
            changeRound={this.changeRound} />
        </div>
        <GenericAlert />
      </div>
  )}
}

const mapStateToProps = (state: State) => ({
  auth_status: state.auth_status
});

export default connect(mapStateToProps)(Result);
