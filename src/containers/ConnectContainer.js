import React, { Component } from "react";

import UserCard from "../components/UserCard";
import DetailsContainer from "./DetailsContainer";
import { Grid } from "semantic-ui-react";
import UserDetailsContainer from "./UserDetailsContainer";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const STATUS_URL = "http://localhost:3000/daily_status/create";

export default class ConnectContainer extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      allStatus: [],
      activeUser: []
    };
  }
  componentDidMount() {
    this.getAllUsers();
    this.getAllStatus();
  }

  getAllUsers = () => {
    fetch(`http://localhost:3000/users/`)
      .then(resp => resp.json())
      .then(json => {
        this.setState({ users: json });
        // localStorage.users = JSON.stringify(this.state.users);
      });
  };

  getAllStatus = () => {
    fetch(`http://localhost:3000/daily_status/`)
      .then(resp => resp.json())
      .then(json => {
        this.setState({ allStatus: json.reverse() });
      });
  };

  addStatus = (event, userID) => {
    console.log("added status for: ");

    let input = event.currentTarget.statusInput.value;
    if (input.trim().length === 0) {
      alert("Please enter a status!");
      return;
    }
    let body = { dailyStatus: { user_id: userID, status: input } };
    fetch(STATUS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(r => r.json())
      .then(status => {
        this.setState({ allStatus: [status, ...this.state.allStatus] });
      });
    event.currentTarget.reset();
  };

  // handleCardClick = (username) =>{
  //   debugger
  //   this.setState({
  //     activeUser: this.findUserByUserName(username)
  //   })
  // }

  index = () => {
    return (
      <Grid columns={5}>
        <Grid.Row>
          {this.state.users.map(user => {
            let lastStatus = this.findLastUserStatusesById(user.id)
            return (
              <Grid.Column key={user.id}>
                <Link to={`/${user.login}`}>
                  <UserCard
                    key={user.id}
                    userObj={user}
                    lastestStatus={lastStatus}

                  />
                </Link>
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
    );
  };

  //Filters through all statuses and returns the latest
  findLastUserStatusesById = user_id => {
    let lastStatus = this.state.allStatus.filter(status => {
      return status.user_id === user_id;
    })[0];
    if (lastStatus == undefined){
      return "No status yet..."
    } else {
      return lastStatus.status
    }
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

  findUserByUserName = username => {
    return this.state.users.find(user => user.login === username);
  };

  findUserIdByUserName = username => {
    let user = this.state.users.find(user => user.login === username);
    return user.id;
  };

  showUserDetails = props => {
    console.log(props);
    return (
      <UserDetailsContainer
        userObj={this.findUserByUserName(props.match.params.username)}
        addStatus={this.addStatus}
        allUserStatuses={this.state.allStatus.filter(status => {
          return (
            status.user_id ===
            this.findUserIdByUserName(props.match.params.username)
          );
        })}
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
