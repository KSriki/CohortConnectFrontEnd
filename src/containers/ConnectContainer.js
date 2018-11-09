import React, { Component } from "react";

import UserCard from "../components/UserCard";
import DetailsContainer from "./DetailsContainer";
import { Grid } from "semantic-ui-react";
import UserDetails from "../components/UserDetails";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

export default class ConnectContainer extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    fetch(`http://localhost:3000/users/`)
      .then(resp => resp.json())
      .then(json => this.setState({ users: json }));
  }

  addStatus = (event, props) => {
    // for submitting user's current status to DB
    // TODO
    console.log("added status for: ");
  };

  index = () => {
    return (
      <Grid columns={3}>
        <Grid.Row>
          {this.state.users.map(user => {
            return (
              <Grid.Column key={user.id}>
                <Link to={`/${user.login}`}>
                  <UserCard key={user.id} userObj={user} />
                </Link>
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
    );
  };

  details = props => {
    return (
      <DetailsContainer
        {...props}
        addStatus={this.addStatus}
        users={this.state.users}
      />
    );
  };

  showUserDetails = props => {
    return (
      <UserDetails
        userObj={this.state.users.find(
          user => user.login === props.match.params.username
        )}
        addStatus={this.addStatus}
      />
    );
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={this.index} />
          {/* both /details and /details id begin with /detail */}
          <Route path="/:username" render={this.showUserDetails} />
        </Switch>
      </Router>
    );
  }
}
