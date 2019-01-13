import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {addCartItem} from '../actions/actionCreator';
import {bindActionCreators} from 'redux';

import {Image, Button, Popup, Card, Statistic, Placeholder, Icon} from 'semantic-ui-react';

export const ProductCardPlaceholder = () => {
  return (
      <Card className='product-card' style={{height: 472}}>
        <Placeholder style={{height: 300}}>
          <Placeholder.Image/>
        </Placeholder>
        <Card.Content fluid='true'>
          <Card.Header style={{minHeight: 50}}>
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line/>
                <Placeholder.Line/>
              </Placeholder.Header>
            </Placeholder>
          </Card.Header>
        </Card.Content>
        <Card.Content fluid='true'>
          <div className='ui center aligned'>
            <Popup
                trigger={<Button content='Toevoegen' icon='cart' color='green'/>}
                content='Klik om het product toe te voegen aan jouw winkelwagen.'
                hideOnScroll
            />
          </div>
        </Card.Content>
      </Card>
  );
};

class ImageHover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {classNameHover: ''};
  }

  onMouseOver(e) {
    this.setState({
      classNameHover: 'hvr-bob',
    });
  }

  onMouseOut(e) {
    this.setState({
      classNameHover: '',
    });
  }

  render() {
    return (
        <Image
            src={this.props.url}
            style={{maxHeight: 300, padding: 20}}
            centered={true}
            onMouseEnter={this.onMouseOver.bind(this)}
            onMouseLeave={this.onMouseOut.bind(this)}
            className={this.state.classNameHover}
        />
    );
  }
}

class ProductCard extends React.Component {
  addToCart = () => {
    this.props.addCartItem(this.props.id, this.props.title, this.props.price, this.props.url);
  };

  render() {
    return (
        <Card className='product-card'>
          <Link to={'/product/' + this.props.id}>
            <ImageHover url={this.props.url}/>
          </Link>

          <Card.Content fluid='true'>
            <Card.Header style={{minHeight: 50}}>
              <Link to={'/product/' + this.props.id}>{this.props.title} </Link>
            </Card.Header>
            <Card.Description>
              <Statistic size='mini'>
                <Statistic.Value>€ {String(this.props.price.toFixed(2)).replace('.', ',')}</Statistic.Value>
              </Statistic>
            </Card.Description>
          </Card.Content>

          <Card.Content fluid='true'>
            <div className='ui center aligned'>
              <Popup
                  trigger={
                    <Button
                        animated
                        color='green'
                        onClick={() => {
                          this.addToCart();
                        }}>
                      <Button.Content visible>Toevoegen</Button.Content>
                      <Button.Content hidden>
                        <Icon name='cart'/>
                      </Button.Content>
                    </Button>
                  }
                  content='Klik om het product direct toe te voegen aan jouw winkelwagen.'
                  hideOnScroll
              />
            </div>
          </Card.Content>
        </Card>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
      {
        addCartItem,
      },
      dispatch,
  );
};

export default connect(
    null,
    mapDispatchToProps,
)(ProductCard);
