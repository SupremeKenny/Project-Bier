import React from "react";
import { Link } from "react-router-dom";
import {
	Button,
	List,
	Icon,
	Dimmer,
	Loader,
	Grid,
	Header,
	Container,
	Segment,
	Popup,
	Message,
} from "semantic-ui-react";

export class AllDiscounts extends React.Component {
	constructor() {
		super();
		this.state = {
			discounts: {},
			loaded: false,
			message: "",
			displayMessage: false,
		};
	}

	componentDidMount() {
		this.fetchDiscounts();
	}

	fetchDiscounts = () => {
		fetch("/admin/FetchAllDiscounts")
			.then(results => {
				if (results.ok) {
					results.json().then(data => {
						this.handleDiscountState(data.discounts);
					});
				} else {
					this.setState(
						{ message: "Oopsie doopsie, something went wrong....", loaded: true, displayMessage: true },
						this.messageShowCallback,
					);
				}
			})
			.catch(err => {
				this.setState(
					{
						message: "Oopsie doopsie, something went wrong...." + err,
						loaded: true,
						displayMessage: true,
					},
					this.messageShowCallback,
				);
			});
	};

	handleDiscountState = discounts => {
		let discountsAssociative = {};
		discounts.forEach(element => {
			discountsAssociative[element.code] = element;
		});

		this.setState({ discounts: discountsAssociative, loaded: true });
	};

	handleDeleteProduct = id => {
		this.setState({ loaded: false });
		fetch("/admin/deletediscount/" + id, {
			method: "DELETE",
		}).then(response => {
			if (response.ok) {
				let discounts = this.state.discounts;
				delete discounts[id];
				this.setState(
					{
						...this.state,
						displayMessage: true,
						message: "Code: " + id + " is succesvol verwijderd!",
						discounts: discounts,
						loaded: true,
					},
					this.messageShowCallback,
				);
			} else {
				this.setState(
					{
						...this.state,
						message: "Oopsie doopsie, something went wrong....",
						loaded: true,
						displayMessage: true,
					},
					this.messageShowCallback,
				);
			}
		});
	};

	messageShowCallback = () => {
		setTimeout(() => {
			this.setState({ ...this.state, message: "", displayMessage: false });
		}, 3000);
	};

	listDiscountItems = () => {
		let items = [];
		for (var key in this.state.discounts) {
			var value = this.state.discounts[key];
			items.push(value);
		}

		if (Object.keys(this.state.discounts).length === 0 && this.state.discounts.constructor === Object) {
			return <p>Er zijn op dit moment geen kortingscodes actief.</p>;
		}
		return items.map(p => (
			<List.Item key={p.code}>
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
									onClick={this.handleDeleteProduct.bind(this, p.code)}
								/>
							</Grid.Column>
						</Grid>
					</Popup>
				</List.Content>

				<List.Content verticalAlign="bottom">
					<Header as="h4">
						<Link to={"/admin-editdiscount/" + p.code}>{p.code}</Link>
					</Header>
					{p.procent ? <div>{p.amount} procent korting </div> : <div>{p.amount} euro korting </div>}
				</List.Content>
			</List.Item>
		));
	};

	render() {
		let message;
		if (this.state.displayMessage) {
			message = <Message header="Notificatie" content={this.state.message} positive />;
		}
		if (!this.state.loaded) {
			return (
				<Dimmer active inverted>
					<Loader size="large">Loading</Loader>
				</Dimmer>
			);
		} else
			return (
				<Container>
					{message}
					<Header as="h1">Kortingscodes</Header>
					<Segment>
						<Grid columns={1}>
							<Grid.Column>
								<List divided verticalAlign="bottom" size={"small"}>
									{this.listDiscountItems()}
								</List>
							</Grid.Column>
						</Grid>
					</Segment>
				</Container>
			);
	}
}
