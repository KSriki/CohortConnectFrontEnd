import React, { Component } from "react";

import UserCard from "../components/UserCard";
import DetailsContainer from "./DetailsContainer";
import { Grid } from "semantic-ui-react";
import UserDetails from "../components/UserDetails";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const STATUS_URL = "http://localhost:3000/daily_status/create";

export default class ConnectContainer extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      allStatus: []
    };
  }
  componentDidMount() {


     this.getAllUsers();
     this.getAllStatus();
  }

  getAllUsers = () => {
      fetch(`http://localhost:3000/users/`)
        .then(resp => resp.json())
        .then(json => this.setState({ users: json }));
  }


  getAllStatus = () => {
      fetch(`http://localhost:3000/daily_status/`)
        .then(resp => resp.json())
        .then(json => this.setState({ allStatus: json }));
  }


  addStatus = (event, userID) => {
    // for submitting user's current status to DB
    // TODO
    console.log("added status for: ");

    let input = event.currentTarget.statusInput.value;
    let body = { dailyStatus: {user_id: userID, status: input} };
    fetch(STATUS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(r => r.json())
      .then(console.log);
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


  findUserByUserName = (username) => {

     return this.state.users.find(
        user => user.login === username
      )
  }

  findUserIdByUserName = (username) => {

      let user = (this.state.users.find(
        user => user.login === username
    ));

    return user.id;

  }



  showUserDetails = props => {
      console.log(props);
    return (
      <UserDetails
        userObj={this.findUserByUserName(props.match.params.username)}
        addStatus={this.addStatus}
        allUserStatuses={
            this.state.allStatus.filter(
                (status) => {return status.user_id === this.findUserIdByUserName(props.match.params.username)}
            )
        }
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
