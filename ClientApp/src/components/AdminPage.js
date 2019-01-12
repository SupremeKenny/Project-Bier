import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Grid, Loader} from 'semantic-ui-react';
import {AdminLayout} from './AdminPage/AdminLayout';
import {NavMenu} from './AdminPage/NavMenu';


class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: 'true',
      validated: 'false'
    }
  }

  componentWillMount() {
    this.checkCredentials();
  }

  componentWillUpdate() {
    this.checkCredentials();
  }

  checkCredentials = () => {
    if (this.props.reduxState.loggedIn === false) {
      this.setState({loading: false, validated: false})
    } else {
      let token = 'Bearer ' + this.props.reduxState.token;
      fetch('/account/admincheck', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .then(results => {
        if (results.ok) {
          results.json().then(data => {
            if (data.isAdmin) {
              this.setState({loading: false, validated: true})
            } else {
              this.setState({loading: false, validated: false})
            }
          });
        } else {
          this.setState({loading: false, validated: false})
        }
      })
      .catch(err => {
        this.setState({loading: false, validated: false})
      });
    }
  };

  render() {
    if (this.state.loading) {
      return <Loader size='large'>Loading</Loader>
    } else {
      if (this.state.validated) {
        return (
            <AdminLayout>
              <Grid>
                <Grid.Column width={4}>
                  <NavMenu/>
                </Grid.Column>
                <Grid.Column width={12}>
                  {this.props.children}
                </Grid.Column>
              </Grid>
            </AdminLayout>
        )
      }
      else {
        return <Redirect to="/"/>
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    reduxState: state.login,
  };
};

export default connect(
    mapStateToProps,
    null,
)(AdminPage);
