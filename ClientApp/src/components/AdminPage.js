import React from "react";

import {NavMenu} from "./AdminPage/NavMenu";
import {Grid} from "semantic-ui-react";
import {AdminLayout} from "./AdminPage/AdminLayout";

export class AdminPage extends React.Component 
{
    render(){
        return (
            <AdminLayout>
                <Grid >
                    <Grid.Column width={4}>
                        <NavMenu/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        {this.props.children}
                    </Grid.Column>
                </Grid>
            </AdminLayout>
        )
    }
}