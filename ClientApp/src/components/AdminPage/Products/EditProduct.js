import React from "react";
import { 
	Header, 
	Segment, 
	Form, 
	TextArea, 
	Select, 
	Container, 
	Loader,
	Dimmer,
	Divider, 
	Button, 
	Icon 
} from "semantic-ui-react";

export class EditProducts extends React.Component {
	constructor() {
		super();
		this.state = {
			id: "",
			name: "",
			categoryId: "",
			price: "",
			brewerName: "",
			countryName: "",
			alcoholPercentage: "",
			content: "",
			url: "",
			description: "",

			product: {},
			loaded: false,

			// shouldDisplayMessage: false,
			check: false
		};
	}

	componentWillMount() {
		fetch("/admin/fetch/" + this.props.match.params.id).then(results => {
			results.json().then(data => {
				console.log (data)
				this.setState({
					product: data.product,
					loaded: true,
					id: data.product.id,
					name: data.product.name,
					categoryId: data.product.categoryId,
					price: data.product.price,
					brewerName: data.product.brewerName,
					countryName: data.product.countryName,
					alcoholPercentage: data.product.alcoholPercentage,
					content: data.product.content,
					url: data.product.url,
					description: data.product.description,
				});
			});
		});
	}

	handleChange = (e, { name, value }) => this.setState({ [name]: value });
	toggle = () => this.setState({ check: !this.state.check })
    validate = () => {
        if (this.state.check){
			this.setState({loaded: false})
            this.handleSubmit()
        }
        else alert ("Mislukt! U heeft de checkbox nog niet aangevinkt.")
    }

	handleSubmit = () => {
		let bodyData = JSON.stringify({
			Id: this.state.id,
			Name: this.state.name,
			CategoryId: this.state.categoryId,
			Price: this.state.price,
			BrewerName: this.state.brewerName,
			CountryName: this.state.countryName,
			AlcoholPercentage: this.state.alcoholPercentage,
			Content: this.state.content,
			Url: this.state.url,
			Description: this.state.description,
		});

		if (this.state.id !== "" && this.state.name !== "" && this.state.categoryId !== "" && this.state.price !== "") {
			console.log("Uitgevoerd")
				fetch("admin/Update/" + this.props.match.params.id, {
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					method: "Put",
					body: bodyData,
				}).then(response =>{
					if (response.ok) {
						alert("Product is succesvol aangepast.");
					} 
					else alert("Error! Product is niet aangepast.")
					this.setState({ check: false , loaded: true});
					
				});
		} else console.log("Verplichte velden leeg");
	};

	render() {
		// const {
		// 	id,
		// 	name,
		// 	categoryId,
		// 	price,
		// 	brewerName,
		// 	countryName,
		// 	alcoholPercentage,
		// 	content,
		// 	url,
		// 	description,
		// 	check
		// } = this.state;

		if (!this.state.loaded) {
			return(
				<Dimmer active inverted>
					<Loader size="large">Loading</Loader>
				</Dimmer>
			);
		} else
			return (
				<Container>
					<div>
                    <Button animated floated="right" href="/admin-AllProducts" color="blue">
							<Button.Content visible>Terug naar overzicht</Button.Content>
							<Button.Content hidden>
								<Icon name="arrow left" />
							</Button.Content>
						</Button>
						<Header as="h1">Product Aanpassen</Header>
						
					</div>
					<Divider />
					<Segment>
						<Form onSubmit={this.validate} id="myForm">
							<Form.Group unstackable widths={2}>
								<Form.Input
									label="Product ID (url)"
									placeholder="Id"
									name="id"
									value={this.state.id}
									onChange={this.handleChange}
									required
								/>
								<Form.Input
									label="Naam"
									placeholder="Name"
									name="name"
									value={this.state.name}
									onChange={this.handleChange}
									required
								/>
							</Form.Group>

							<Form.Group widths={2}>
								<Form.Field
									control={Select}
									label="Categorie"
									placeholder="CategoryId"
									options={CategoryId}
									name="categoryId"
									value={this.state.categoryId}
									onChange={this.handleChange}
									required
								/>
								<Form.Input
									label="Prijs"
									placeholder="Price"
									name="price"
									value={this.state.price}
									onChange={this.handleChange}
									type="number"
									step="0.01"
									min="0.00"
									required
								/>
							</Form.Group>

							<Form.Group widths={2}>
								<Form.Input
									label="Brouwer"
									placeholder="BrewerName"
									name="brewerName"
									value={this.state.brewerName}
									onChange={this.handleChange}
									required
								/>
								<Form.Input
									label="Land van herkomst"
									placeholder="CountryName"
									name="countryName"
									value={this.state.countryName}
									onChange={this.handleChange}
									required
								/>
							</Form.Group>

							<Form.Group widths={2}>
								<Form.Input
									label="Alcoholpercentage"
									placeholder="AlcoholPercentage"
									name="alcoholPercentage"
									value={this.state.alcoholPercentage}
									onChange={this.handleChange}
									type='number'
                                	step="0.01"
                                	min="0.00"
									required
								/>
								<Form.Input
									label="Inhoud"
									placeholder="Content"
									name="content"
									value={this.state.content}
									onChange={this.handleChange}
									required
								/>
							</Form.Group>

							<Form.Input
								label="Afbeelding Link"
								placeholder="Url"
								name="url"
								value={this.state.url}
								onChange={this.handleChange}
								required
							/>

							<Form.Field
								control={TextArea}
								label="Omschrijving"
								placeholder="Description"
								name="description"
								value={this.state.description}
								onChange={this.handleChange}
								required
							/>

							<Form.Checkbox 
                            label='Alle gegevens zijn gecontroleerd'
                            value = {this.check}
                            onChange = {this.toggle}
                            required
							toggle
                            />
							<Form.Button content="Aanpassen" color="blue" />
						</Form>
					</Segment>

					{/* <Segment>
						<div>
							<Header as="h3" content="JSON Request body" />
							<pre>
								{JSON.stringify(
									{
										id,
										name,
										categoryId,
										price,
										brewerName,
										countryName,
										alcoholPercentage,
										content,
										url,
										description,
										check
									},
									null,
									2,
								)}
							</pre>
						</div>
					</Segment> */}
				</Container>
			);
	}
}

const CategoryId = [
	{ key: "1", text: "Amber", value: "Amber" },
	{ key: "2", text: "Barley Wine", value: "Barley Wine" },
	{ key: "3", text: "Belian Ale", value: "Belgian Ale" },
	{ key: "4", text: "Blond", value: "Blond" },
	{ key: "5", text: "Bock", value: "Bock" },
	{ key: "6", text: "Brown Ale", value: "Brown Ale" },
	{ key: "7", text: "Dubbel", value: "Dubbel" },
	{ key: "8", text: "India Pale Ale", value: "India Pale Ale" },
	{ key: "9", text: "Lager", value: "Lager" },
	{ key: "10", text: "Pale Ale", value: "Pale Ale" },
	{ key: "11", text: "Pils", value: "Pils" },
	{ key: "12", text: "Porter", value: "Porter" },
	{ key: "13", text: "Quadrupel", value: "Quadrupel" },
	{ key: "14", text: "Saison", value: "Saison" },
	{ key: "15", text: "Sour Beer", value: "Sour Beer" },
	{ key: "16", text: "Stout", value: "Stout" },
	{ key: "17", text: "Tripel", value: "Tripel" },
	{ key: "18", text: "Weizen", value: "Weizen" },
	{ key: "19", text: "Wit", value: "Wit" },
];
