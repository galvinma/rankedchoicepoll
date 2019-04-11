import * as React from "react"

// css
import '../.././App.css'
import './BarChart.css'

interface Props {
  chart_data: {},
  poll_items: string[],
}

interface State {
  width: number;
  height: number;
}

class BarChart extends React.Component <Props, State> {
  constructor(props: any)
  {
      super(props)
      this.state = {
        width: 0,
        height: 0
      }

      this.returnBar = this.returnBar.bind(this)
      this.returnLabel = this.returnLabel.bind(this)
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

   }

    componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }

    public updateWindowDimensions() {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

   public returnLabel(key: any, index: any)
   {
     return (
       <div key={key} className="barLabel">{key}</div>
     )
   }

   public returnBar(key: any, index: any)
   {
     var container = document.getElementById("barBox") as any
     let data = this.props.chart_data as any
     let width = `${data[key]["result"] * container.offsetWidth}`
     let widthOverflow = '100%'
     let whiteSpaceWidth = 'auto'
     let height = '10'
     let color
     if (data[key]["active"] === true)
     {
       color = "#000000"
     }
     else
     {
       color = "#BDBDBD"
     }

     let barColor = {
       fill: color
     }

     var e = document.getElementById("barBox") as any

     return (
       <div className="barContainer" key={key + "bar"}>
          <svg className="barSVG" width={width} height={height}>
            <rect className="bar" width={width} height={height} style={barColor}/>
          </svg>
          <div className="percentContainer">{String(Math.round(Number(data[key]["result"])*10000)/100)+"%"}</div>
          <svg className="barSVG" width={whiteSpaceWidth} height={height}>
            <rect className="whiteSpace" width={whiteSpaceWidth} height={height}/>
          </svg>
       </div>
     )
   }

   public render(){

   var graphStyle = {
     minHeight: `${this.props.poll_items.length*50}px`,
   } as React.CSSProperties;

   return (
      <div className="graphContainer" style={graphStyle}>
        <div id="chartContainer" className="chartContainer">
          <div className="labelContainer">
            {Object.keys(this.props.chart_data).map(this.returnLabel)}
          </div>
          <div id="barBox" className="barBox">
            <div>
            {Object.keys(this.props.chart_data).map(this.returnBar)}
            </div>
            <div className="xAxisContainer">
              <div className="xAxisLabel">
                <div className="xAxisLabelText">0%</div>
              </div>
              <div className="xAxisLabel xAxisBorder">
                <div className="xAxisLabelText">25%</div>
              </div>
              <div className="xAxisLabel xAxisBorder">
                <div className="xAxisLabelText">50%</div>
              </div>
              <div className="xAxisLabel xAxisBorder">
                <div className="xAxisLabelText">75%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
   )}
}

export default (BarChart);
