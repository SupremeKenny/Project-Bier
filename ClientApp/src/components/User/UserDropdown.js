import React from "react";
import { connect } from "react-redux";
import { Button, Dropdown } from 'semantic-ui-react'
import { logoutUser } from '../../actions/actionCreator'
import { bindActionCreators } from 'redux'

class UserDropdown extends React.Component {
    render() {
        return (
            <Button.Group color="green">
                <Dropdown style={{ marginRight: "10px" }} button text={"Welkom " + this.props.reduxState.login.userName}>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { window.location.href = "/account/overzicht" }}>Accountoverzicht</Dropdown.Item>
                        <Dropdown.Item onClick={this.userLogout}>Uitloggen</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> 
            </Button.Group>
        );
    }

    userLogout = (e) => {
        this.props.logoutUser();
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logoutUser
    }, dispatch)
}

const mapStateToProps = state => {
    return {
        reduxState: state
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserDropdown);
