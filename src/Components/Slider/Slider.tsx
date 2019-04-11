import * as React from "react"

// css
import '../.././App.css'
import './Slider.css'

interface Props {
  selected_round: number;
  slider_max: number;
  changeRound: any
}

interface State {}

class Slider extends React.Component <Props, State> {
  constructor(props: any)
  {
    super(props);

    this.handleChange = this.handleChange.bind(this)
    this.returnSliderLabel = this.returnSliderLabel.bind(this)
  }

  public handleChange = (event: any) =>
  {
    this.props.changeRound(event.target.value)
  }

  public returnSliderLabel()
  {
    const sliderLabels: any = []
    let count: number = 1

    while (count <= this.props.slider_max+1)
    {
        sliderLabels.push(<div key={count+"slider"} className="sliderLabel">{count}</div>)
        count++
    }

    return sliderLabels
  }

  render() {
    let sliderLabels = this.returnSliderLabel()
    console.log(this.props.slider_max)
    return (
      <div className="sliderContainer">
        <input type="range" className="slider" defaultValue={String(this.props.slider_max)} min={0} max={this.props.slider_max} step={1} onChange={this.handleChange} />
        <div className="sliderLabelContainer">
          {sliderLabels}
        </div>
        <div>Round Selector</div>
      </div>
    )}
}

export default (Slider)
