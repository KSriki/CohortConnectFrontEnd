import React, { Component } from "react";

import UserCard from "../components/UserCard";
import DetailsContainer from "./DetailsContainer";
import { Grid } from "semantic-ui-react";

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


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

  index = () => {
      return (<Grid columns={3} >
        <Grid.Row>
          {this.state.users.map(user => {
            return (
              <Grid.Column key={user.id}>
                <Link to={`/details/${user.id}`}><UserCard key={user.id} user={user} /></Link>
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>)
  }

  details = () => {
      return (<DetailsContainer users={this.state.users}/>)
  }

  render() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={this.index}/>
                {/* both /details and /details id begin with /detail */}
                <Route path="/details" component={this.details} />
            </Switch>
        </Router>
    );
  }
}
