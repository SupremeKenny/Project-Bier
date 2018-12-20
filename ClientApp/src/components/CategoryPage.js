import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard, { ProductCardPlaceholder } from './ProductCards.js';
import { CardGroup, Container, Breadcrumb, Divider, Segment, Header } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';

const LoaderContainer = () => {
	let numbers = [...Array(8).keys()];
	return (
		<CardGroup itemsPerRow={4}>
			{numbers.map(number => (
				<ProductCardPlaceholder key={number} />
			))}
		</CardGroup>
	);
};

const BreadcrumbTop = props => {
	return (
		<div>
			<Breadcrumb>
				<Link to='/'>
					<Breadcrumb.Section>Hoofdpagina</Breadcrumb.Section>{' '}
				</Link>
				<Breadcrumb.Divider icon='right angle' />
				<Link to={'/category/' + props.url}>
					<Breadcrumb.Section>{props.url}</Breadcrumb.Section>
				</Link>
			</Breadcrumb>
			<Divider />
		</div>
	);
};

const headerSX = { fontFamily: 'Raleway', fontSize: 38, color: '#2f3542' };

export class CategoryPage extends React.Component {
	constructor() {
		super();
		this.state = {
			products: [],
			hasMore: true,
			currentIndex: 0,
			loadingProducts: false,
			loadedDescription: false,
			description: '',
		};
	}

	componentDidMount() {
		this.loadCategoryDescription();
	}

	componentDidUpdate(prevProps) {
		// When the parameters of the url change the component state need to be reset
		// to make sure the products of the new category get loaded
		let oldParamaters = prevProps.match.params.id;
		let newParameters = this.props.match.params.id;
		if (oldParamaters !== newParameters) {
			this.resetState();
		}
	}

	resetState() {
		this.loadCategoryDescription();
		this.setState({
			products: [],
			currentIndex: 0,
			hasMore: true,
			description: '',
			loadedDescription: false,
			loadingProducts: false,
		});
	}

	loadCategoryDescription = () => {
		fetch('/product/GetCategoryDescription?categoryId=' + this.props.match.params.id)
			.then(results => {
				if (results.ok) {
					results
						.json()
						.then(data => {
							this.setState({
								description: data.description,
								loadedDescription: true,
							});
						})
						.catch(err => this.handleError(err));
				}
			})
			.catch(err => this.handleError(err));
	};

	loadProducts = () => {
		this.setState({ ...this.state, loadingProducts: true }, this.fetchProducts());
	};

	// TODO: refer the error page when the fetch failed
	fetchProducts = () => {
		fetch(
			'/product/GetCategoryItems?categoryId=' + this.props.match.params.id + '&index=' + this.state.currentIndex,
		)
			.then(results => {
				if (results.ok) {
					results
						.json()
						.then(data => {
							var newIndex = this.state.currentIndex + 1;
							var hasMore = !(newIndex === data.totalCollections + 1);

							this.setState({
								products: this.state.products.concat(data.items),
								currentIndex: newIndex,
								hasMore: hasMore,
								loadingProducts: false,
							});
						})
						.catch(err => this.handleError(err));
				}
			})
			.catch(err => this.handleError(err));
	};

	handleError = error => {
		console.error(error);
	};

	render() {
		return (
			<div>
			
				<Container style={{ paddingTop: '2em' }}>
					<BreadcrumbTop url={this.props.match.params.id} />
					<Segment basic loading={!this.state.loadedDescription}>
						<Header as='h1' style={headerSX} content={this.props.match.params.id} />
						<p style={{ fontSize: 18 }}>{this.state.description}</p>
					</Segment>
					<Divider />

					<InfiniteScroll
						pageStart={0}
						loadMore={this.loadProducts}
						hasMore={this.state.hasMore && !this.state.loadingProducts}
						loader={<LoaderContainer />}
						useWindow={true}
						threshold={1200}>
						<CardGroup itemsPerRow={4}>
							{this.state.products.map(item => (
								<ProductCard
									url={item.url}
									price={item.price}
									title={item.name}
									id={item.id}
									key={item.id}
								/>
							))}
						</CardGroup>
					</InfiniteScroll>
				</Container>
			</div>
		);
	}
}
