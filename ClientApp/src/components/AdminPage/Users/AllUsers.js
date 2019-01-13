import React from "react";
import { Link } from "react-router-dom";
import {
	Button,
	List,
	Icon,
	Dimmer,
	Loader,
	Pagination,
	Grid,
	Header,
	Container,
	Segment,
	Popup,
} from "semantic-ui-react";

export class AllUsers extends React.Component {
	constructor() {
		super();
		this.state = {
			products: {},
			loaded: false,
			activePage: 1,
			totalPages: 1,
		};
	}

	componentDidMount() {
		console.log("CompomnentDidMount");
		fetch("/account/FetchAllUsers/0/12").then(results => {
			results.json().then(data => {
				console.log(data.items)
				this.setState({ 
					totalPages: data.totalPages,
					products: data.items, 
					loaded: true 
				});
			});
		});
	}

	handlePaginationChange = (e, { activePage }) => {
		this.setState({ loaded: false });
		this.fetchData(activePage);
	};

	handleDeleteProduct = id => {
		this.setState({ loaded: false });
		fetch("/account/Delete/" + id, {
			method: "delete",
		}).then(response => {
			if (response.ok) {
				alert("Gebruiker is succesvol verwijderd");
				this.fetchData(this.state.activePage);
			} else {
				this.setState({ loaded: true });
				alert("Error! Gebruiker is niet verwijderd");
			}
		});
	};

	fetchData = currentPage => {
		fetch("/account/FetchAllUsers/" + (currentPage - 1) + "/12").then(results => {
			results.json().then(data => {
				if (data.count === 0 && data.totalPages >= 1) {
					console.log("Empty page");
					this.fetchData(currentPage - 1);
				} else {
					this.setState({
						totalPages: data.totalPages,
						products: data.items,
						activePage: currentPage,
						loaded: true,
					});
				}
			});
		});
	};

	render() {
		const { activePage, totalPages } = this.state;

		if (!this.state.loaded) {
			return (
				<Dimmer active inverted>
					<Loader size="large">Loading</Loader>
				</Dimmer>
			);
		} else
			return (
				<Container>
					<Header as="h1">Gebruikers</Header>
					<Segment>
						<Grid columns={1}>
							<Grid.Column>
								<List divided verticalAlign="bottom" size={"small"}>
									{this.state.products.map(p => (
										<List.Item key={p.id}>
											<List.Content floated="right">
												<Popup
													trigger={
														<Button color="red" size="tiny" animated>
															<Button.Content visible content="Verwijderen" />
															<Button.Content hidden>
																<Icon name="delete" />
															</Button.Content>
														</Button>
													}
													on="click"
													position="right center">
													<Grid>
														<Grid.Column textAlign="center">
															<Header as="h4" content="Weet u het zeker?" />
															<Button
																content="Ja"
																color="red"
																onClick={this.handleDeleteProduct.bind(this, p.id)}
															/>
														</Grid.Column>
													</Grid>
												</Popup>
											</List.Content>
								
											<List.Content verticalAlign="bottom">
												<Header as="h4">
													<Link to={"/admin-editUser/" + p.id}>{p.email}</Link>
												</Header>
											</List.Content>

											<List.Content>
												<h5>{p.firstName} {p.lastName}</h5>
											</List.Content>
										</List.Item>
									))}
								</List>
							</Grid.Column>

							<Grid.Column>
								<Pagination
									activePage={activePage}
									totalPages={totalPages}
									onPageChange={this.handlePaginationChange}
									size="small"
									boundaryRange={0}
									siblingRange={1}
								/>
							</Grid.Column>
						</Grid>
					</Segment>
				</Container>
			);
	}
}
