import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductCard, { ProductCardPlaceholder } from './ProductCards.js';
import { addCartItem, deleteCartItem, decrementCartItem, addDiscount, deleteDiscount } from '../actions/actionCreator';
import { bindActionCreators } from 'redux';
import {
	Container,
	Breadcrumb,
	Grid,
	Image,
	Button,
	Divider,
	Input,
	Header,
	CardGroup,
	Icon,
	Message,
} from 'semantic-ui-react';

const headerStyling = { fontFamily: 'Raleway', fontSize: 25, color: '#ffa502' };
const headerSX = { fontFamily: 'Raleway', fontSize: 32, color: '#2f3542' };

const BreadcrumbTop = () => (
	<div>
		<Divider hidden />
		<Breadcrumb>
			<Link to="/">
				<Breadcrumb.Section link>Hoofdpagina</Breadcrumb.Section>{' '}
			</Link>
			<Breadcrumb.Divider icon="right angle" />
			<Breadcrumb.Section active>Winkelwagentje</Breadcrumb.Section>
		</Breadcrumb>
	</div>
);

const CartTop = () => (
	<div>
		<BreadcrumbTop />
		<Divider />
		<Header as="h1" style={headerSX} content={'Winkelwagentje'} />
		<Divider />
	</div>
);

class ShoppingCart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			discount: { procent: false, amount: 0, code: '', validated: false },
		};
	}

	componentDidMount() {
		if (this.props.shoppingcart.discount !== undefined) {
			this.setState({ ...this.state, discount: this.props.shoppingcart.discount });
		}
	}

	handleCodeChange = (e, { value }) => this.setState({ ...this.state, discount: { code: value } });

	handleDiscount = () => {
		fetch('/order/SearchDiscount?input=' + this.state.discount.code).then(results => {
			if (!results.ok) {
				this.setState(
					{
						discount: { procent: true, amount: 0, code: '', validated: false },
						display: true,
						error: true,
						code: this.state.discount.code,
					},
					() => {
						this.props.deleteDiscount();
					},
				);
			} else {
				results.json().then(data => {
					this.setState(
						{
							...this.state,
							discount: {
								procent: data.discount.procent,
								amount: data.discount.amount,
								validated: true,
								code: this.state.discount.code,
							},
							display: true,
							error: false,
						},
						() => {
							this.props.addDiscount(this.state.discount);
						},
					);
				});
			}
		});
	};

	handleTotal = total => {
		if (total > 0) {
			return total;
		} else {
			return 0;
		}
	};

	render() {
		let message;
		if (this.state.display && this.state.error) {
			message = (
				<div>
					<Message negative>
						<Message.Header>De ingevulde kortingcode is niet geldig!</Message.Header>
						<p>{'"' + this.state.code + '"'} is niet een geldige code.</p>
					</Message>
					<Divider />
				</div>
			);
		} else if (this.state.display) {
			message = (
				<div>
					<Message positive>
						<Message.Header>De kortingscode is geldig!</Message.Header>
						<p>{'U heeft "' + this.state.discount.code + '" ingevuld als kortingcode.'}</p>
					</Message>
					<Divider />
				</div>
			);
		}

		if (this.props.shoppingcart.products.length !== 0) {
			return (
				<Container>
					<CartTop />
					{message}
					<div>
						{this.props.shoppingcart.products.length !== 0 ? (
							<Grid divided="vertically" columns="equal" padded="vertically" verticalAlign="middle">
								{this.props.shoppingcart.products.map(product => (
									<Grid.Row key={product.id}>
										<Grid.Column width={2}>
											<Link to={'/product/' + product.id}>
												<Image src={product.url} size="mini" />
											</Link>
										</Grid.Column>
										<Grid.Column width={4}>
											<Link to={'/product/' + product.id}>
												<Header as="h3" content={product.name} />
											</Link>
										</Grid.Column>
										<Grid.Column width={2}>Prijs: €{String(product.price).replace(".", ",")}</Grid.Column>
										<Grid.Column width={2}>Aantal: {product.count}</Grid.Column>
										<Grid.Column width={2}>
											<div className="ui mini vertical buttons">
												<button
													className="ui icon button"
													command="Up"
													onClick={() => {
														this.props.addCartItem(
															product.id,
															product.name,
															product.price,
															product.url,
														);
													}}>
													<i className="up chevron icon" />
												</button>
												<button
													className="ui icon button"
													command="Down"
													onClick={() => {
														this.props.decrementCartItem(product.id, product.price);
													}}>
													<i className="down chevron icon" />
												</button>
											</div>
										</Grid.Column>
										<Grid.Column width={2}>
											<Button
												negative
												onClick={() => {
													this.props.deleteCartItem(product.id, product.count, product.price);
												}}>
												Verwijder
											</Button>
										</Grid.Column>
										<Grid.Column width={2}>
											Totaal: €
											{String(parseFloat(Math.round(product.count * product.price * 100) / 100).toFixed(
												2,
											)).replace(".", ",")}
										</Grid.Column>
									</Grid.Row>
								))}
							</Grid>
						) : (
							<div>Je winkelwagentje is leeg</div>
						)}
					</div>
					<Divider />
					<Grid columns="equal">
						<Grid.Row columns="equal">
							<Grid.Column textAlign="left">
								<Header as="h4">Kortingscode:</Header>
								<Input
									placeholder="Vul je kortingscode in..."
									onChange={this.handleCodeChange}
									value={this.state.discount.code}
								/>
								<Button onClick={this.handleDiscount} style={{ marginLeft: '1em' }} color="blue">
									Toepassen
								</Button>
							</Grid.Column>
							<Grid.Column textAlign="right">
								{this.state.discount.validated ? (
									<div>
										<h4>
											Subtotaal: €{' '}
											{String(parseFloat(
												Math.round(this.props.shoppingcart.totalPrice * 100) / 100,
											).toFixed(2)).replace(".", ",")}
										</h4>
										{this.state.discount.procent === true ? (
											<div>
												<h4>Korting: {String(this.state.discount.amount).replace(".", ",")}%</h4>
												<h3>
													Totaal: €{' '}
													{String(parseFloat(
														Math.round(
															(this.props.shoppingcart.totalPrice -
																(this.props.shoppingcart.totalPrice / 100) *
																	this.state.discount.amount) *
																100,
														) / 100,
													).toFixed(2)).replace(".", ",")}
												</h3>
											</div>
										) : (
											<div>
												<h4>Korting: € {String(this.state.discount.amount).replace(".", ",")}</h4>
												<h3>
													Totaal: €{' '}
													{String(parseFloat(
														this.handleTotal(
															Math.round(
																(this.props.shoppingcart.totalPrice -
																	this.state.discount.amount) *
																	100,
															) / 100,
														),
													).toFixed(2)).replace(".", ",")}
												</h3>
											</div>
										)}
									</div>
								) : (
									<h3>
										Totaal: €{' '}
										{String(parseFloat(Math.round(this.props.shoppingcart.totalPrice * 100) / 100).toFixed(2)).replace(".", ",")}
									</h3>
								)}
							</Grid.Column>
						</Grid.Row>
					</Grid>

					<Divider />
					<Button floated="right" animated href="/checkout" color="green">
						<Button.Content visible>Verder met bestellen</Button.Content>
						<Button.Content hidden>
							<Icon name="arrow right" />
						</Button.Content>
					</Button>
					<Button floated="left" animated href="/">
						<Button.Content visible>Terug naar winkel</Button.Content>
						<Button.Content hidden>
							<Icon name="arrow left" />
						</Button.Content>
					</Button>
				</Container>
			);
		} else {
			return <EmptyShoppingCart />;
		}
	}
}

class EmptyShoppingCart extends Component {
	constructor() {
		super();
		this.state = { products: [], loaded: false };
	}

	componentWillMount() {
		this.getExampleProducts();
	}

	getExampleProducts() {
		fetch('/product/GetProducts?count=4')
			.then(results => {
				if (results.ok) {
					results.json().then(data => {
						this.setState({ products: data.products, loaded: true });
					});
				}
			})
			.catch(error => {
				this.setState({ loaded: true });
				console.error(error);
			});
	}

	render() {
		let productGroup;
		if (this.state.loaded) {
			productGroup = <ProductsGroup products={this.state.products} />;
		} else {
			productGroup = <ProductsGroupPlaceholder number={[1, 2, 3, 4]} />;
		}
		return (
			<div>
				<CartTop />
				<p> Je hebt geen producten in je winkelwagentje!</p>
				<Button positive href="/">
					Verder met winkelen
				</Button>
				<Divider />

				<Header as="h3" style={headerStyling} textAlign="center">
					Deze biertjes zijn bijvoorbeeld heel lekker!
					<Header.Subheader>Erg lekker, lekker, lekker...</Header.Subheader>
				</Header>
				{productGroup}
			</div>
		);
	}
}

// TODO Move this to a seperate file, as it is duplicate from HomePage.js
const ProductsGroup = props => (
	<CardGroup itemsPerRow={4}>
		{props.products.map(beer => (
			<ProductCard id={beer.id} key={beer.id} title={beer.name} url={beer.url} price={beer.price} />
		))}
	</CardGroup>
);

// TODO Move this to a seperate file, as it is duplicate from HomePage.js
const ProductsGroupPlaceholder = props => (
	<CardGroup itemsPerRow={4}>
		{props.number.map(number => (
			<ProductCardPlaceholder key={number} />
		))}
	</CardGroup>
);

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			addCartItem,
			deleteCartItem,
			decrementCartItem,
			addDiscount,
			deleteDiscount,
		},
		dispatch,
	);
};

const mapStateToProps = state => {
	return {
		shoppingcart: state.shoppingcart,
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ShoppingCart);
