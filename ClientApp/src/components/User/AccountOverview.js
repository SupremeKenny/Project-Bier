import { Link, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from '../../actions/actionCreator'
import { bindActionCreators } from 'redux'
import {
    Container, Breadcrumb, Divider, Header, Tab, Loader
} from "semantic-ui-react";

const BreadCrumbTop = () => {
    return (
        <div>
            <Breadcrumb>
                <Link to="/">
                    <Breadcrumb.Section link>
                        Hoofdpagina
              </Breadcrumb.Section>
                </Link>
                <Breadcrumb.Divider icon="right angle" />
                <Link to="/account/overzicht">
                    <Breadcrumb.Section link>
                        Accountoverzicht
              </Breadcrumb.Section>
                </Link>

            </Breadcrumb>
            <Divider />
        </div>);
}

const MainContainer = ({ children }) => {
    const sx = {
        paddingTop: "2em"
    };

    return <Container style={sx}>{children}</Container>;
};

// TODO Implement server callings
class AccountOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItem: 1,
            orderLoaded: false,
            infoLoaded: false
        }
    }

    handleRangeChange = e => this.setState({ activeIndex: e.target.value });
    handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

    loadOrders = () => {
        // TODO implement
    }

    loadPersonsalInfo = () => {
        // TODO implement
    }

    render() {
        const { activeIndex } = this.state

        const panes = [
            { menuItem: 'Mijn bestellingen', render: () => <PersonalInfoOverview loaded={this.state.infoLoaded} /> },
            { menuItem: 'Mijn gegevens', render: () => <OrderOverview loaded={this.state.orderLoaded} /> }]

        // If the user is not logged in he/she is redirected to the home page
        if (!this.props.reduxState.loggedIn) {
            return <Redirect push to={""} />;
        }

        return (
            <MainContainer>
                <BreadCrumbTop />
                <Tab panes={panes} activeIndex={activeIndex} onTabChange={this.handleTabChange} />
            </MainContainer>
        );
    }
}

const LoaderCenter = () => <Loader active inline='centered' style={{paddingTop: "2em"}}/>

// TODO create overview
const OrderOverview = props => {
    if (!props.loaded) {
        return <LoaderCenter />;
    }

    return (<Container style={{paddingTop: "2em"}}>
        <Header as="h3" content="Mijn bestellingen" />
    </Container>)
}

// TODO create order summary functional component

// TODO implement 
// The submitting changes  will be implemted using a callback function
const PersonalInfoOverview = props => {
    if (!props.loaded) {
        return <LoaderCenter />;
    }

    return (<Container style={{paddingTop: "2em"}}>
        <Header as="h3" content="Persoonlijke gegevens" />

    </Container>);
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logoutUser
    }, dispatch)
}

const mapStateToProps = state => {
    return {
        reduxState: state.login
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountOverview);