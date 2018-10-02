import React, { Component } from "react";
import {
    Header,
    Container,
    Rating,
    Breadcrumb,
    Segment,
    Grid,
    Image,
    Label,
    Button,
    Icon,
    Popup,
    Divider,
    Table,
    Input,
    Card,
    Menu,
    CardGroup
  } from "semantic-ui-react";


  const MainContainer = ({ children }) => {
    const sx = {
      paddingTop: "2em"
    };
  
    return <Container style={sx}>{children}</Container>;
  };

  const GridExampleContainer = () => (
    <Grid centered columns={4}>
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
      </Grid.Column>
    </Grid>
  )

  const CardExampleGroups = () => (
    <Card.Group centered="true">
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
          <Card.Header>Steve Sanders</Card.Header>
          <Card.Meta>Friends of Elliot</Card.Meta>
          <Card.Description>
            Steve wants to add you to the group <strong>best friends</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
              Approve
            </Button>
            <Button basic color='red'>
              Decline
            </Button>
          </div>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
          <Card.Header>Molly Thomas</Card.Header>
          <Card.Meta>New User</Card.Meta>
          <Card.Description>
            Molly wants to add you to the group <strong>musicians</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
              Approve
            </Button>
            <Button basic color='red'>
              Decline
            </Button>
          </div>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
          <Card.Header>Jenny Lawrence</Card.Header>
          <Card.Meta>New User</Card.Meta>
          <Card.Description>Jenny requested permission to view your contact details</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
              Approve
            </Button>
            <Button basic color='red'>
              Decline
            </Button>
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
  )


  const TempCard = () => (
    <Card>
        <Image src='https://react.semantic-ui.com/images/wireframe/white-image.png' />
        <Card.Content>
            <Card.Header>[Name of the Beer]</Card.Header>
            <Card.Meta>
                [Brand] | 33cl
            </Card.Meta>
            <Card.Description>
                <Icon name = 'euro sign' /> [Price]
            </Card.Description>
        </Card.Content>

        <Card.Content centered = 'true' >
            <Container centered = 'true'>
                <Button.Group size='large'>
                    <Button>
                        <Icon name = 'cart'/>
                    </Button>
                    <Button.Or />
                    <Button>
                        <Icon name = 'favorite'/>
                    </Button>
                </Button.Group>
            </Container>
            

        </Card.Content>
    </Card>
  )

  const ProductsGroup = () => (
      <CardGroup centered = "true" itemsPerRow={4}>
        <TempCard/>
        <TempCard/>
        <TempCard/>
        <TempCard/>
        <TempCard/>
        <TempCard/>
        <TempCard/>
        <TempCard/>
      </CardGroup>
  )

  export class HomePage extends React.Component {

    state = { activeItem: 'Beer 1 Topper' }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })


      render() {
        const { activeItem } = this.state

          return(
            <MainContainer>

                <Breadcrumb>
                    <Breadcrumb.Section active link>Home</Breadcrumb.Section>
                </Breadcrumb>
                <Divider />

                <Grid centered = "true">
                    <Grid.Column stretched width={12}>
                    <Segment>
                        This is an stretched grid column. This segment will always match the tab height
                    </Segment>
                    </Grid.Column>

                    <Grid.Column width={4}>
                    <Menu fluid vertical tabular='right'>
                        <Menu.Item name='Beer 1 Topper' active={activeItem === 'Beer 1 Topper'} onClick={this.handleItemClick} />
                        <Menu.Item name='Beer 2 Topper' active={activeItem === 'Beer 2 Topper'} onClick={this.handleItemClick} />
                        <Menu.Item name='Beer 3 Topper' active={activeItem === 'Beer 3 Topper'} onClick={this.handleItemClick} />
                        <Menu.Item name='Beer 4 Topper' active={activeItem === 'Beer 4 Topper'} onClick={this.handleItemClick} />
                    </Menu>
                    </Grid.Column>
                </Grid>
                <Divider />

                <ProductsGroup/>

            </MainContainer>
          );
      }
  }