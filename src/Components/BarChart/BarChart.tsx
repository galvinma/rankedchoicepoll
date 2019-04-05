import * as React from "react"

// css
import '../.././App.css'
import './BarChart.css'

interface Props {
  chart_data: {}
}

interface State {}

class BarChart extends React.Component <Props, State> {
  constructor(props: any)
  {
      super(props)
      this.state = {}

      this.returnBar = this.returnBar.bind(this)
   }

   returnBar(key: any, index: any)
   {
     var container = document.getElementById("chartContainer") as any
     let data = this.props.chart_data as any
     let width = `${data[key] * container.offsetWidth}`
     let whiteSpaceWidth = container.offsetWidth - Number(width)
     let height = '10'

     var e = document.getElementById("chartContainer") as any
     console.log(e.offsetWidth)


     return (
       <div className="barContainer" key={key}>
          <div className="barLabel">{key}</div>
          <svg width={width} height={height}>
            <rect className="bar" width={width} height={height}/>
          </svg>
          <svg width={whiteSpaceWidth} height={height}>
            <rect className="whiteSpace" width={whiteSpaceWidth} height={height}/>
          </svg>
       </div>
     )
   }

   public render(){
   return (
      <div id="chartContainer" className="chartContainer">
        {Object.keys(this.props.chart_data).map(this.returnBar)}
      </div>
   )}
}

export default (BarChart);
