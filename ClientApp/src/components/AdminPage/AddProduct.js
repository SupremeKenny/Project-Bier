import React, { Component } from "react";
import { Button, 
    Header, 
    Icon, 
    Segment, 
    Form, 
    TextArea, 
    Select, 
    Container, 
    Divider} from 'semantic-ui-react';

export class AddProducts extends React.Component{

    addProduct = (event) =>
    {
        event.preventDefault();  
        const data = new FormData(event.target);
    }


    render(){
        return (
            <Container>
                <Header as='h1'>Product toevoegen</Header>
                <Segment>
                    <Form onSubmit={this.addProduct}>
                        <Form.Group unstackable widths={2}>
                            <Form.Input label='Id' placeholder='Id' />
                            <Form.Input label='Naam' placeholder='Name' />
                        </Form.Group>

                        <Form.Group widths={2}>
                            <Form.Field control = {Select} label='Categorie' placeholder='CategoryId' options={CategoryId}/>
                            <Form.Input label='Prijs' placeholder='Price' />
                        </Form.Group>

                        <Form.Group widths={2}>
                            <Form.Input label='Brouwer' placeholder='BrewerName'/>
                            <Form.Input label='Land van herkomst' placeholder='CountryName'/>
                        </Form.Group>

                        <Form.Group widths={2}>
                            <Form.Input label='Alcohol %' placeholder='AlcoholPercentage'/>
                            <Form.Input label='Inhoud' placeholder='Content'/>
                        </Form.Group>

                        <Form.Input label='Website Link' placeholder='Url'/>
                        <Form.Field control={TextArea} label='Omschrijving' placeholder='Description' />

                        <Form.Checkbox label='Alle gegevens zijn gecontroleerd' />
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Segment>
            </Container>
        );
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