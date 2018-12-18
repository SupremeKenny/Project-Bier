import { Link, Redirect } from "react-router-dom";
import PersonalInfoOverview from "./PersonalInfoOverview.js";
import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/actionCreator";
import { bindActionCreators } from "redux";
import { Container, Breadcrumb, Divider, Header, Tab, Loader } from "semantic-ui-react";

const BreadCrumbTop = () => {
	return (
		<div>
			<Breadcrumb>
				<Breadcrumb.Section>
					<Link to="/">Hoofdpagina </Link>
				</Breadcrumb.Section>
				<Breadcrumb.Divider icon="right angle" />
				<Breadcrumb.Section>
					<Link to="/account/overzicht">Accountoverzicht </Link>
				</Breadcrumb.Section>
			</Breadcrumb>
			<Divider />
		</div>
	);
};

const MainContainer = ({ children }) => {
	const sx = {
		paddingTop: "2em",
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
			infoLoaded: false,
			loadingError: false,

			personalInfo: {},
			orderInfo: {},
		};
	}

	componentWillMount() {
		this.loadOrders();
		this.loadPersonsalInfo();
	}

	handleRangeChange = e => this.setState({ activeIndex: e.target.value });
	handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

	loadOrders = () => {
		// TODO implement
	};

	loadPersonsalInfo = () => {
		let bearerToken = "Bearer " + this.props.reduxState.token;
		fetch("account/getaccountinformation", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: bearerToken,
			},
		}).then(results => {
			if (results.ok) {
				results.json().then(data => {
					this.setState({
						...this.state,
						personalInfo: data,
						infoLoaded: true,
					});
				});
			} else {
				this.setState({ ...this.state, loadingError: false });
			}
		});
	};

	render() {
		const { activeIndex } = this.state;

		const panes = [
			{
				menuItem: "Mijn bestellingen",
				render: () => <OrderOverview loaded={this.state.orderLoaded} data={this.state.orderData} />,
			},
			{
				menuItem: "Mijn gegevens",
				render: () => {
					if (!this.state.infoLoaded) {
						return <LoaderCenter />;
					} else return <PersonalInfoOverview 
          data={this.state.personalInfo}
          token={this.props.reduxState.token} />;
				},
			},
		];

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

const LoaderCenter = () => <Loader active inline="centered" style={{ paddingTop: "2em" }} />;

// TODO create overview
const OrderOverview = props => {
	if (!props.loaded) {
		return <LoaderCenter />;
	}

	return (
		<Container style={{ paddingTop: "2em" }}>
			<Header as="h3" content="Mijn bestellingen" />
		</Container>
	);
};

// TODO create order summary functional component

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			logoutUser,
		},
		dispatch,
	);
};

const mapStateToProps = state => {
	return {
		reduxState: state.login,
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(AccountOverview);
