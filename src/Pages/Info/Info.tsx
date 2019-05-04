import * as React from "react";
import history from '../.././history';
import axios from 'axios';

// redux
import store from '../.././Store/store'
const { connect } = require("react-redux");

// css
import '../.././App.css'
import './Info.css'

// components
import ExternalNavbar from '../../Components/Navbar/ExternalNavbar/ExternalNavbar'
import BarChart from '../../Components/BarChart/BarChart'
import Slider from '../../Components/Slider/Slider'

// functions
import { retMinMax, tally, merge, iterateTally } from '../.././Utils/tallyvotes'
import { checkAuth } from '../.././Utils/checkauth'
import { tallyVotes } from '../.././Utils/tallyvotes'
import { dispatchAlert } from '../.././Utils/dispatchalert'
import { sortPollObject } from '../.././Utils/sortpollobject'
import { TallyDictionary, PollArray } from '../.././Utils/tallyvotes'

// data
const mockCityItems = ["Portland", "Seattle", "Los Angeles", "San Francisco", "Oakland", "San Diego"]
const mockCityVotes = [
  ["Portland", "Seattle", "Los Angeles", "San Francisco", "Oakland", "San Diego"],
  ["San Francisco", "Oakland", "San Diego", "Portland", "Seattle", "Los Angeles"],
  ["Portland", "Seattle", "San Francisco", "Oakland", "San Diego", "Los Angeles"],
  ["San Francisco", "Portland", "Oakland", "San Diego", "Seattle", "Los Angeles"],
  ["San Diego", "Seattle", "Los Angeles", "Oakland", "San Francisco", "Portland"],
  ["San Diego", "Oakland", "Seattle", "Los Angeles", "San Francisco", "Portland"],
  ["Oakland", "San Diego", "San Francisco", "Portland", "Seattle", "Los Angeles"],
  ["Seattle", "Los Angeles", "Oakland", "San Diego", "San Francisco", "Portland"],
  ["Los Angeles", "San Diego", "San Francisco","Seattle", "Portland", "Oakland"],
  ["Portland", "Oakland", "San Diego", "Los Angeles", "Seattle", "San Francisco"],
  ["Seattle", "San Diego", "Los Angeles", "Oakland", "San Francisco", "Portland"],
  ["Seattle", "San Francisco", "Portland", "San Diego", "Los Angeles", "Oakland"],
  ["Los Angeles", "Seattle", "Portland", "Oakland", "San Diego", "San Francisco"],
  ["Seattle", "Portland", "Oakland", "San Diego", "Los Angeles", "San Francisco"],
  ["Oakland", "Seattle", "San Francisco", "San Diego", "Portland", "Los Angeles"]]
const mockTitle = "What is you favorite west coast city?"

// Props / State
interface Props {}

interface State {
  title: string,
  poll_items: string[],
  options: number,
  leader: string[],
  chart_data: any,
  tally: any,
  slider_max: any,
  selected_round: any,
}

class Info extends React.Component <Props, State> {
  constructor(props: any)
  {
    super(props)

    this.state = {
      leader: [],
      title: "",
      poll_items: [],
      options: 0,
      chart_data: {},
      tally: {},
      slider_max: null,
      selected_round: null,
    }

    this.changeRound = this.changeRound.bind(this)
    this.mapLeaders = this.mapLeaders.bind(this)
    this.winnerText = this.winnerText.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount()
  {
    let mockVotes = []
    let num = 0
    while (num < 200)
    {
      let temp = Math.floor(Math.random() * mockCityVotes.length)
      mockVotes.push(mockCityVotes[temp])
      num++
    }

    let result = iterateTally(mockVotes, mockCityItems, 0.5)
    let count = 0
    let data = mockCityItems
    let ret: any[] = []

    data.forEach((item: any) => {
      ret.push({id: String(count), content: item})
      count++
    })

    const tallyResponse = iterateTally(mockVotes, mockCityItems, 0.5)
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
      title: mockTitle,
      poll_items: mockCityItems,
      options: mockCityItems.length,
      leader: tallyResponse[tallyResponse.length-1].leader,
      chart_data: chartData,
      tally: tallyResponse,
      slider_max: Object.keys(tallyResponse).length-1,
      selected_round: Object.keys(tallyResponse).length-1,
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

  public mapLeaders()
  {
    const retLeaders = []
    const len: number = this.state.leader.length
    for (var i=0; i<len; i++)
    {
      let tempResult = <div key={i} className="leaderResult">{this.state.leader[i]}</div>
      retLeaders.push(tempResult)
      if (i+1 < len)
      {
        const comma = <div className="comma">,</div>
        retLeaders.push(comma)
      }
    }

    return retLeaders
  }

  public winnerText()
  {
    if (this.state.leader.length <= 1)
    {
      return "Winner:"
    }
    else
    {
      return "Winners:"
    }
  }

  public handleClick()
  {
    history.push('/join')
  }


  public render() {
    let retLeaders = this.mapLeaders()
    let retWinnerText = this.winnerText()
    return (
      <div>
        <ExternalNavbar />
        <div className="contentContainer bodyPaper primaryBackground">
          <div className="headerThree">What is Ranked Choice Voting?</div>
          <div className="bodyText infoParagraph">Also known as instant-runoff voting, ranked choice voting is a method of preferential voting. The system allows voters to rank candidates instead of picking one choice. Ranked choice helps eliminate the spoiler effect, and gives minority parties a chance in a two party system.</div>
          <div className="headerThree">How does it work?</div>
          <div className="bodyText infoParagraph">Voters rank poll options and cast a ballot. If the first choice of each voter received greater than 50% of the overall vote the election is over. If no candidate received more than half of the votes, the last place candidate is eliminated. The votes that were cast for this losing candidate are transfered to the voter's second choice and the results are tallied. This process is iterated until a candidate receives more than half the total number of votes, or there is only one candidate left. If two candidates have an equal number of votes they are eliminated at the same time. An example of this process is shown below.</div>


          <div className="headerThree infoTitle">{this.state.title}</div>
          <div className="redUnderline winnerText">{retWinnerText} {retLeaders}</div>
          <div className="infoBar">
            <BarChart
              chart_data={this.state.chart_data}
              poll_items={this.state.poll_items} />
          </div>
          <Slider
            selected_round={this.state.selected_round}
            slider_max={this.state.slider_max}
            changeRound={this.changeRound} />
        </div>
      </div>
  )}
}

export default (Info)
