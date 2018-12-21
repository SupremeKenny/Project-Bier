import { Link, Redirect } from 'react-router-dom';
import PersonalInfoOverview from './PersonalInfoOverview.js';
import OrdersOverview from './OrdersOverview.js';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/actionCreator';
import { bindActionCreators } from 'redux';
import { Container, Breadcrumb, Divider, Tab, Loader } from 'semantic-ui-react';

const BreadCrumbTop = () => {
	return (
		<div>
			<Breadcrumb>
				<Breadcrumb.Section>
					<Link to='/'>Hoofdpagina </Link>
				</Breadcrumb.Section>
				<Breadcrumb.Divider icon='right angle' />
				<Breadcrumb.Section>
					<Link to='/account/overzicht'>Accountoverzicht </Link>
				</Breadcrumb.Section>
			</Breadcrumb>
			<Divider />
		</div>
	);
};

const MainContainer = ({ children }) => {
	const sx = {
		paddingTop: '2em',
	};

	return <Container style={sx}>{children}</Container>;
};

const LoaderCenter = () => <Loader active inline='centered' style={{ paddingTop: '2em' }} />;

class AccountOverview extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeItem: 1,
			ordersLoaded: false,
			infoLoaded: false,
			loadingError: false,

			personalInfo: {},
			orders: {},
		};
	}

	componentWillMount() {
		if(this.props.reduxState.loggedIn) {
			let bearerToken = 'Bearer ' + this.props.reduxState.token;
			this.loadOrders(bearerToken);
			this.loadPersonsalInfo(bearerToken);
		}
	}

	handleRangeChange = e => this.setState({ activeIndex: e.target.value });
	handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });

	loadOrders = token => {
		fetch('/order/getuserorders', {
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
						this.setState({
							...this.state,
							orders: data.orders,
							ordersLoaded: true,
						});
					});
				} else {
					this.handleLoadingError();
				}
			})
			.catch(err => {
				this.handleLoadingError(err);
			});
	};

	loadPersonsalInfo = token => {
		fetch('account/getaccountinformation', {
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
						this.setState({
							...this.state,
							personalInfo: data,
							infoLoaded: true,
						});
					});
				} else {
					this.handleLoadingError();
				}
			})
			.catch(err => {
				this.handleLoadingError(err);
			});
	};

	handleLoadingError = err => {
		console.log(err);
		this.setState({ ...this.state, loadingError: true });
	};

	render() {
		const { activeIndex } = this.state;

		const panes = [
			{
				menuItem: 'Mijn bestellingen',
				render: () => {
					if (!this.state.ordersLoaded) {
						return <LoaderCenter />;
					} else return <OrdersOverview data={this.state.orders} />;
				},
			},
			{
				menuItem: 'Mijn gegevens',
				render: () => {
					if (!this.state.infoLoaded) {
						return <LoaderCenter />;
					} else
						return (
							<PersonalInfoOverview data={this.state.personalInfo} token={this.props.reduxState.token} />
						);
				},
			},
		];

		// If the user is not logged in he/she is redirected to the home page
		if (!this.props.reduxState.loggedIn) {
			return <Redirect push to={'/'} />;
		}

		return (
			<MainContainer>
				<BreadCrumbTop />
				<Tab panes={panes} activeIndex={activeIndex} onTabChange={this.handleTabChange} />
			</MainContainer>
		);
	}
}

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
