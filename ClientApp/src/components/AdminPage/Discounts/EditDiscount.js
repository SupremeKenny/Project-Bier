import React from "react";
import {
    Header,
    Segment,
    Form,
    Select,
    Container,
    Loader
} from 'semantic-ui-react';

export class EditDiscount extends React.Component {
    state = {
        code: '',
        procent: '',
        amount: '',

        loaded: false
    }

    componentWillMount (){
        fetch ("/order/SearchDiscount?input=" + this.props.match.params.id)
        .then(results => {
            results.json().then (data =>{
                if(data.discount.procent == true){
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
                
            })
        });
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        let bodyData = null;
        if(this.state.procent === "Procent"){
            bodyData = JSON.stringify({
                "Code":               this.state.code,
                "Procent":            true,
                "Amount":             this.state.amount
            })
        } else {
            bodyData = JSON.stringify({
                "Code":               this.state.code,
                "Procent":            false,
                "Amount":             this.state.amount
            })
        }

        

        // var validate = this.state.id
        // console.log(validate)
        if ( this.state.code !== "" && this.state.procent !== "" && this.state.amount !== "") {
            console.log("Uitgevoerd"),
            fetch('admin/updatediscount/' + this.props.match.params.id, {
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: bodyData
            })
        }
        else console.log("Verplichte velden leeg");
    }

    render() {
        // Todo: Can delete const states if I dont display the <pre> anymore in de return Render()
        const {
            code,
            procent,
            amount,
        } = this.state;

        if (!this.state.loaded) {
            return (
                <Loader/>
            );
        } else

        return (
            <Container>
                <Header as='h1'>Kortingscode toevoegen</Header>
                <Segment>
                    <Form onSubmit={this.handleSubmit} id="myForm">
                        <Form.Group unstackable widths={2}>
                            <Form.Input
                                label='Code *'
                                placeholder='Kortingscode'
                                name='code'
                                value={this.state.code}
                                onChange={this.handleChange}
                            />
                            <Form.Field
                                control={Select}
                                label='Procent of euro korting *'
                                placeholder='Procent of euro korting'
                                options={Procent}
                                name='procent'
                                value={this.state.procent}
                                onChange={this.handleChange}
                            />
                        </Form.Group>

                        <Form.Group widths={2}>
                            
                            <Form.Input
                                label='Hoeveelheid *'
                                placeholder='Euro korting/Procent korting'
                                name='amount'
                                value={this.state.amount}
                                onChange={this.handleChange}
                                type='number'
                                step="0.01"
                                min="0.00"
                            />
                        </Form.Group>

                        <Form.Checkbox label='Alle gegevens zijn gecontroleerd' />
                        <Form.Button content='Submit' />
                    </Form>
                </Segment>

                {/* Todo: Can delete <pre> if I dont have to display states anymore */}
                <pre>
                    {JSON.stringify({
                        code,
                        procent,
                        amount,
                    }, null, 2)}
                </pre>

            </Container>
        );
    }

}

const Procent = [
    { key: '1', text: 'Procent', value: 'Procent' },
    { key: '2', text: 'Euro', value: 'Euro' }
]