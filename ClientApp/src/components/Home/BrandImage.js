import React from 'react';

export class BrandImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {className: 'brand'};
  }

  imageStyling = {flex: 'none', maxHeight: 80};

  onMouseOver(e) {
    this.setState({
      className: 'brand-hover'
    });
  }

  onMouseOut(e) {
    this.setState({
      className: 'brand'
    });
  }

  render() {
    return (
        <img
            color="red"
            onMouseEnter={this.onMouseOver.bind(this)}
            onMouseLeave={this.onMouseOut.bind(this)}
            className={this.state.className}
            src={this.props.url}
            style={this.imageStyling}
            alt=""
        />
    );
  }
}
