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
  }

  public handleChange = (event: any) =>
  {
    this.props.changeRound(event.target.value)
  }


  render() {
    return (
      <div className="sliderContainer">
        <input type="range" className="slider" defaultValue={String(this.props.selected_round)} min={0} max={this.props.slider_max} step={1} onChange={this.handleChange} />
      </div>
    )}
}

export default (Slider)
