import React from "react";
import {
    Header,
    Segment,
    Form,
    TextArea,
    Select,
    Container,
    Loader
} from 'semantic-ui-react';

export class EditProducts extends React.Component {
    constructor (){
        super()
        this.state = {
            id: '',
            name: '',
            categoryId: '',
            price: '',
            brewerName: '',
            countryName: '',
            alcoholPercentage: '',
            content: '',
            url: '',
            description: '',

            product: {},
            loaded: false
        }

    }
    

    componentWillMount (){
        fetch ("/admin/fetch/" + this.props.match.params.id)
        .then(results => {
            results.json().then (data =>{
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
                    description: data.product.description
                });
            })
        });
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        let bodyData = JSON.stringify({
            "Id":                   this.state.id,
            "Name":                 this.state.name,
            "CategoryId":           this.state.categoryId,
            "Price":                this.state.price,
            "BrewerName":           this.state.brewerName,
            "CountryName":          this.state.countryName,
            "AlcoholPercentage":    this.state.alcoholPercentage,
            "Content":              this.state.content,
            "Url":                  this.state.url,
            "Description":          this.state.description,
        })

        if (this.state.id !== "" && this.state.name !== "" && this.state.categoryId !== "" && this.state.price !== "") {
            console.log("Uitgevoerd"),
            fetch('admin/Update/' + this.props.match.params.id, {
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'Put',
                body: bodyData
            })
        }
        else console.log("Verplichte velden leeg");
    }

    render () {
        // const {
        //     id,
        //     name,
        //     categoryId,
        //     price,
        //     brewerName,
        //     countryName,
        //     alcoholPercentage,
        //     content,
        //     url,
        //     description
        // } = this.state;

        if (!this.state.loaded) {
            return (
                <Loader/>
            );
        } else

        return (
            <Container>
                <Header as='h1'>Product wijzigen</Header>
                <Segment>
                    <Form onSubmit={this.handleSubmit} id="myForm">
                        <Form.Group unstackable widths={2}>
                            <Form.Input
                                label='Id - Niet bewerkbaar !!'
                                placeholder='Id'
                                name='id'
                                value = {this.state.id}
                                onChange={this.handleChange}
                                // readOnly
                            />
                            <Form.Input
                                label='Naam *'
                                placeholder='Name'
                                name='name'
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                        </Form.Group>

                        <Form.Group widths={2}>
                            <Form.Field
                                control={Select}
                                label='Categorie *'
                                placeholder='CategoryId'
                                options={CategoryId}
                                name='categoryId'
                                value={this.state.categoryId}
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                label='Prijs *'
                                placeholder='Price'
                                name='price'
                                value={this.state.price}
                                onChange={this.handleChange}
                                type = "number"
                                step="0.01"
                                min="0.00"
                            />
                        </Form.Group>

                        <Form.Group widths={2}>
                            <Form.Input
                                label='Brouwer'
                                placeholder='BrewerName'
                                name='brewerName'
                                value={this.state.brewerName}
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                label='Land van herkomst'
                                placeholder='CountryName'
                                name='countryName'
                                value={this.state.countryName}
                                onChange={this.handleChange}
                            />
                        </Form.Group>

                        <Form.Group widths={2}>
                            <Form.Input
                                label='Alcohol %'
                                placeholder='AlcoholPercentage'
                                name='alcoholPercentage'
                                value={this.state.alcoholPercentage}
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                label='Inhoud'
                                placeholder='Content'
                                name='content'
                                value={this.state.content}
                                onChange={this.handleChange}
                            />
                        </Form.Group>

                        <Form.Input
                            label='Website Link'
                            placeholder='Url'
                            name='url'
                            value={this.state.url}
                            onChange={this.handleChange}
                            type='url'
                        />

                        <Form.Field
                            control={TextArea}
                            label='Omschrijving'
                            placeholder='Description'
                            name='description'
                            value={this.state.description}
                            onChange={this.handleChange}
                        />

                        <Form.Checkbox label='Alle gegevens zijn gecontroleerd' />
                        <Form.Button content='Submit' />
                    </Form>
                </Segment>

                {/* <pre>
                    {JSON.stringify({
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
                    }, null, 2)}
                </pre> */}

            </Container>
        )
    }


}

const CategoryId = [
    { key: '1', text: 'Amber', value: 'amber' },
    { key: '2', text: 'Barley Wine', value: 'barley-wine' },
    { key: '3', text: 'Belian Ale', value: 'belian-ale' },
    { key: '4', text: 'Blond', value: 'blond' },
    { key: '5', text: 'Bock', value: 'bock' },
    { key: '6', text: 'Brown Ale', value: 'brown-ale' },
    { key: '7', text: 'Dubbel', value: 'dubbel' },
    { key: '8', text: 'India Pale Ale', value: 'india-pale-ale' },
    { key: '9', text: 'Lager', value: 'lager' },
    { key: '10', text: 'Pale Ale', value: 'pale-ale' },
    { key: '11', text: 'Pils', value: 'pils' },
    { key: '12', text: 'Porter', value: 'porter' },
    { key: '13', text: 'Quadrupel', value: 'quadrupel' },
    { key: '14', text: 'Saison', value: 'saison' },
    { key: '15', text: 'Sour Beer', value: 'sour-beer' },
    { key: '16', text: 'Stout', value: 'stout' },
    { key: '17', text: 'Tripel', value: 'tripel' },
    { key: '18', text: 'Weizen', value: 'weizen' },
    { key: '19', text: 'Wit', value: 'wit' },
]