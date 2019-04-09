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
import { dispatchAlert } from '../.././Utils/dispatchalert'
import { sortPollObject } from '../.././Utils/sortpollobject'

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
      if (response.data.success === false)
      {
        dispatchAlert(store.getState().error, response.data.message, "INFINITE")
      }

      if (response.data.status === true)
      {
        history.push(`/poll/${response.data.poll_id}`)
      }

      let count = 0
      let data = response.data.poll_items
      let ret: any[] = []

      data.forEach((item: any) => {
        ret.push({id: String(count), content: item})
        count++
      })

      tallyVotes(id)
      .then((tallyResponse: any) => {
        let tallyCopy: any = Object.assign({}, tallyResponse)

        // Prep tallyResponse with active status
        for (var i=0; i<Object.keys(tallyCopy).length; i++)
        {
          let tal = tallyCopy[i].tally
          let keys = Object.keys(tal)
          for (var j=0; j<keys.length; j++)
          {
            tallyResponse[i]["tally"][keys[j]] =
            {
              active: true,
              result: tallyResponse[i]["tally"][keys[j]],
            }
          }
        }

        // Compile chart data. Keep track of poll entry active status
        let last: any = []
        for (var i=0; i<Object.keys(tallyResponse).length; i++)
        {
          let tal = tallyResponse[i].tally
          for (var j=0; j<last.length; j++)
          {
            if (!(j in tal))
            {
              tallyResponse[i]["tally"][last[j]] =
              {
                active: false,
                result: tallyCopy[i-1]["tally"][last[j]]["result"],
              }
            }
          }

          last = last.concat(tallyResponse[i].last)
        }

        // Ensure only winner is active in last round
        let finalRound = tallyResponse[Object.keys(tallyResponse).length-1].tally
        let winner = tallyResponse[Object.keys(tallyResponse).length-1].leader
        let finalRoundKeys = Object.keys(finalRound)
        for (var i=0; i<finalRoundKeys.length; i++)
        {
          winner.forEach((leader: string) => {
            if (finalRoundKeys[i] !== leader)
            {
              if (tallyResponse[Object.keys(tallyResponse).length-1]["tally"][finalRoundKeys[i]]["active"] === true)
              {
                tallyResponse[Object.keys(tallyResponse).length-1]["tally"][finalRoundKeys[i]]["active"] = false
              }
            }
          })
        }

        // Prep and setState
        const finalResult = tallyResponse[Object.keys(tallyResponse).length-1]
        const tallyKeys: any = Object.keys(finalResult.tally)
        let chartData: any = {}
        tallyKeys.forEach((key: any) => {
          chartData[key] = {
              active: finalResult.tally[key]["active"],
              result: (finalResult.tally[key]["result"] / finalResult.count)
          }
        })

        chartData = sortPollObject(chartData)

        this.setState({
          title: response.data.title,
          poll_items: ret,
          poll_id: id,
          admin_id: response.data.admin_id,
          options: response.data.options,
          leader: tallyResponse[tallyResponse.length-1].leader,
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
    let chartData: any = {}
    tallyKeys.forEach((key: any) => {
      chartData[key] = {
          active: selectedResult.tally[key]["active"],
          result: (selectedResult.tally[key]["result"] / selectedResult.count)
      }
    })

    chartData = sortPollObject(chartData)
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
          <div className="headerTwo pollTitle">{this.state.title}</div>
          <div className="headerThree pollTitle">Winner: {this.state.leader}</div>
          <BarChart
            chart_data={this.state.chart_data}
            poll_items={this.state.poll_items} />
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
