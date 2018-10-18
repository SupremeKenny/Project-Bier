import React from 'react';

import {
  Icon, Button
} from "semantic-ui-react";

export class HeartButton extends React.Component {

  constructor(props) {
    super(props)
    this.state = { classNameHover: '' }
  }

  onMouseOver(e) {
    this.setState({
      classNameHover: "hvr-pulse-grow"
    });
  }

  onMouseOut(e) {
    this.setState({
      classNameHover: ""
    });
  }

  render() {
    return (
      <Button icon color="red" onMouseEnter={this.onMouseOver.bind(this)}
        onMouseLeave={this.onMouseOut.bind(this)} className={this.state.classNameHover}>
        <Icon name="heart" />
      </Button>

    );
  }
};
