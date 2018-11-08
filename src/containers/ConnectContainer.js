import React, { Component } from "react";

import UserCard from "../components/UserCard";
import { Grid } from "semantic-ui-react";

export default class ConnectContainer extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: 0,
      users: []
    };
  }
  componentDidMount() {
    fetch(`http://localhost:3000/users/`)
      .then(resp => resp.json())
      .then(json => this.setState({ users: json }));
  }

  render() {
    return (
      <Grid columns={3} >
        <Grid.Row>
          {this.state.users.map(user => {
            return (
              <Grid.Column key={user.id}>
                <UserCard key={user.id} user={user} />
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
    );
  }
}
