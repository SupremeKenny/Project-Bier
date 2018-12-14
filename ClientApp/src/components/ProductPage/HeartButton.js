import React from 'react';
import { connect } from "react-redux";
import { addFavoritesItem } from '../../actions/actionCreator'
import { bindActionCreators } from 'redux'
import {
  Icon, 
  Button
} from "semantic-ui-react";

export class HeartButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { classNameHover: '' }
  }

  onMouseOver = (e) => {
    this.setState({
      classNameHover: "hvr-pulse-grow"
    });
  }

  onMouseOut = (e) => {
    this.setState({
      classNameHover: ""
    });
  }

  onButtonClick = (e) => {
    if (this.props.onProductPage) {
      this.props.addFavoritesItem(
        this.props.product["id"],
        this.props.product["name"],
        this.props.product["price"],
        this.props.product["url"]
      );
    }
  }

  render() {
    return (
      <Button icon color="red"
        className={this.state.classNameHover}
        onClick={this.onButtonClick}
        onMouseEnter={this.onMouseOver}
        onMouseLeave={this.onMouseOut} >
        <Icon name="heart" />
      </Button>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addFavoritesItem
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HeartButton)
