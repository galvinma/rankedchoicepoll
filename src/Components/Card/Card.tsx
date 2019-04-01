import * as React from "react";
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// css
import '../.././App.css'
import './Card.css'

// Props / State
interface Props {
  header: string;
  content: string;
  link: string;
}

class PollPrompt extends React.Component <Props> {
  public render() {
    return (
      <div className="cardContainer">
        <div className="cardHeader">{this.props.header}</div>
        <div className="cardContent">{this.props.content}</div>
        <div className="cardLink redUnderline">{this.props.link}</div>
      </div>
  )}
}


export default PollPrompt
