import React from 'react';
import ScrollUpButton from 'react-scroll-up-button';
import { Button, Icon } from 'semantic-ui-react';

export default class Scroller extends React.Component {
	render() {
		return (
			<ScrollUpButton ContainerClassName='AnyClassForContainer' TransitionClassName='AnyClassForTransition'  ShowAtPosition={1200}>
				<Button animated color='blue'>
					<Button.Content visible>Terugn aar boven</Button.Content>
					<Button.Content hidden>
						<Icon name='angle double up' />
					</Button.Content>
				</Button>
			</ScrollUpButton>
		);
	}
}
