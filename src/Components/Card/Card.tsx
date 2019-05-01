import * as React from "react";
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import history from '../.././history';

// css
import '../.././App.css'
import './Card.css'

// Props / State
interface Props {
  header: string;
  content: string;
  link: string;
  linkText: string;
}

class PollPrompt extends React.Component <Props> {
  constructor(props: any)
  {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  public handleClick()
  {
    history.push(`/${this.props.link}`)
  }

  public render() {
    return (
      <div className="cardContainer">
        <div className="cardHeader">{this.props.header}</div>
        <div className="cardContent">{this.props.content}</div>
        <div className="cardLink redUnderline" onClick={this.handleClick}>{this.props.linkText}</div>
      </div>
  )}
}


export default PollPrompt
