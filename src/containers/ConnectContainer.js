import React, { Component } from 'react';

import UserCard from '../components/UserCard'
import { Grid, Image } from 'semantic-ui-react'

export default class ConnectContainer extends Component {

    constructor(){
        super();
        this.state = {
            currentUser: 0,
            users: []
        }
    }
    componentDidMount(){

        fetch(`http://localhost:3000/users/`)
        .then(resp => resp.json())
        .then(json => this.setState({users: json}));

    }

    render(){

        return (
        <Grid columns={3} divided>
            <Grid.Row>

            {this.state.users.map(user => {return (<Grid.Column><UserCard key={user.id} user={user}/></Grid.Column>)} )}


            </Grid.Row>
            </Grid>)






    }




}
