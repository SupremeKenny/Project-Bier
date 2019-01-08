import React from 'react';
import { Link } from 'react-router-dom';
import {
	Header,
	Segment,
	Container,
	Dimmer,
	Loader,
	List,
	Grid,
} from 'semantic-ui-react';

export class Populardiscounts extends React.Component {
	state = {
		loaded: false,
	};

	componentWillMount() {
		fetch('/Statitics/FetchPopularDiscounts').then(results => {
			results.json().then(data => {
				console.log(data);

				this.setState({
					populardiscounts: data.populardiscounts,
					loaded: true,
				});
			});
		});
	}

	render() {
		if (!this.state.loaded) {
			return (
				<Dimmer active inverted>
					<Loader size="large">Loading</Loader>
				</Dimmer>
			);
		} else
			return (
				<Container>
					<Header as="h1">Meest gebruikte kortingscodes</Header>

					<Segment>
						<Grid columns={1}>
							<Grid.Column>
								<List divided verticalAlign="bottom" size={'medium'}>
									{Object.keys(this.state.populardiscounts).map(
										(key, index) => (
											<List.Item key={index}>
												<List.Content floated="right" />

												<List.Content verticalAlign="bottom">
													<Header as="h4">
														{/* <Link to={"/product/" + key}> */}
														<Link to={'/admin-editdiscount/' + key}>{key}</Link>
													</Header>
													{this.state.populardiscounts[key]} keer gebruikt
												</List.Content>
											</List.Item>
										),
									)}
								</List>
							</Grid.Column>
						</Grid>
					</Segment>
				</Container>
			);
	}
}
