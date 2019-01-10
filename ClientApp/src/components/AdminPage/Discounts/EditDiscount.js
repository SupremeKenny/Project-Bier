import React from "react";
import { 
	Header, 
	Segment, 
	Form, 
	Select, 
	Container, 
	Loader,
	Dimmer,
	Divider, 
	Button, 
	Icon 
} from "semantic-ui-react";

export class EditDiscount extends React.Component {
	state = {
		code: "",
		procent: "",
		amount: "",

		loaded: false,
		check: false
	};

	componentWillMount() {
		fetch("/order/SearchDiscount?input=" + this.props.match.params.id).then(results => {
			results.json().then(data => {
				if (data.discount.procent == true) {
					this.setState({
						code: data.discount.code,
						procent: "Procent",
						amount: data.discount.amount,
						loaded: true,
					});
				} else {
					this.setState({
						code: data.discount.code,
						procent: "Euro",
						amount: data.discount.amount,
						loaded: true,
					});
				}
			});
		});
	}

	handleChange = (e, { name, value }) => this.setState({ [name]: value });
	toggle = () => this.setState({ check: !this.state.check })
    validate = () => {

        if ( this.state.code == "" && this.state.procent == "" && this.state.amount == "") {
            alert("Niet alle velden zijn ingevuld");
        } else {

            if (this.state.procent === "Procent" && this.state.amount > 100){
                alert("Een procentuele korting mag niet hoger zijn dan 100 procent");
                
            } else {
            
                if (this.state.check){
                    this.setState({loaded: false})
                    setTimeout (() => {
                        this.handleSubmit()
                    },200)
                    
                }
                else alert ("Mislukt! U heeft de checkbox nog niet aangevinkt.")
            }
        }
    }


	handleSubmit = () => {
		let bodyData = null;
		if (this.state.procent === "Procent") {
			bodyData = JSON.stringify({
				Code: this.state.code,
				Procent: true,
				Amount: this.state.amount,
			});
		} else {
			bodyData = JSON.stringify({
				Code: this.state.code,
				Procent: false,
				Amount: this.state.amount,
			});
		}

		// var validate = this.state.id
		// console.log(validate)
		if (this.state.code !== "" && this.state.procent !== "" && this.state.amount !== "") {
			console.log("Uitgevoerd"),
				fetch("admin/updatediscount/" + this.props.match.params.id, {
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					method: "PUT",
					body: bodyData,
				}).then(response =>{
					if (response.ok) {
						alert("Kortingscode is succesvol aangepast.");
					} 
					else alert("Error! Kortingscode is niet aangepast.")
					this.setState({ check: false , loaded: true});
					
				});
		} else console.log("Verplichte velden leeg");
	};

	render() {
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
                    <Button animated floated="right" href="/admin-AllDiscounts" color="blue">
							<Button.Content visible>Terug naar overzicht</Button.Content>
							<Button.Content hidden>
								<Icon name="arrow left" />
							</Button.Content>
						</Button>
						<Header as="h1">Kortingscode Aanpassen</Header>
						
					</div>
					<Divider />					
					<Segment>
						<Form onSubmit={this.validate} id="myForm">
							<Form.Group unstackable widths={2}>
								<Form.Input
									label="Code *"
									placeholder="Kortingscode"
									name="code"
									value={this.state.code}
									onChange={this.handleChange}
								/>
								<Form.Field
									control={Select}
									label="Procent of euro korting *"
									placeholder="Procent of euro korting"
									options={Procent}
									name="procent"
									value={this.state.procent}
									onChange={this.handleChange}
								/>
							</Form.Group>

							<Form.Group widths={2}>
								<Form.Input
									label="Hoeveelheid *"
									placeholder="Euro korting/Procent korting"
									name="amount"
									value={this.state.amount}
									onChange={this.handleChange}
									type="number"
									step="0.01"
									min="0.00"
								/>
							</Form.Group>

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
				</Container>
			);
	}
}

const Procent = [{ key: "1", text: "Procent", value: "Procent" }, { key: "2", text: "Euro", value: "Euro" }];
