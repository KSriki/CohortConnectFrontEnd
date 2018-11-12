import React, { Component } from "react";

import UserCard from "../components/UserCard";
import DetailsContainer from "./DetailsContainer";
import { Grid } from "semantic-ui-react";
import UserDetailsContainer from "./UserDetailsContainer";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const STATUS_URL = "http://localhost:3000/daily_status/create";

//finds the difference in todays date and the date the post was made
export function getDifference(status_date) {
  //get todays date
  let today = new Date();
  //default value to return is
  //the posts creation date in a readable format using toLocaleDateString
  //example: 11/7/2018
  let ago = status_date.toLocaleDateString();
  //gets the difference in milliseconds
  let difference = today - status_date;
  //get seconds from milliseconds and round down
  let seconds = Math.floor(difference / 1000);
  //
  if (seconds === 0) {
    ago = "Just now";
  } else {
    //get minutes from seconds
    let minutes = Math.floor(seconds / 60);
    if (minutes === 0) {
      if (seconds === 1) {
        ago = `${seconds} second ago`;
      } else {
        ago = `${seconds} seconds ago`;
      }
    } else {
      //get hours from minutes
      let hours = Math.floor(minutes / 60);
      if (hours === 0) {
        if (minutes === 1) {
          ago = `${minutes} minute ago`;
        } else {
          ago = `${minutes} minutes ago`;
        }
      } else {
        //get days from hours
        let days = Math.floor(hours / 24);
        if (days === 0) {
          if (hours === 1) {
            ago = `${hours} hour ago`;
          } else {
            ago = `${hours} hours ago`;
          }
        } else {
          //1 day vs many days
          if (days === 1) {
            ago = `${days} day ago`;
          } else {
            ago = `${days} days ago`;
          }
        }
      }
    }
  }

  return ago;
}

export default class ConnectContainer extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      allStatus: [],
      activeUser: [],
      allEvents: []
    };
  }
  componentDidMount() {
    this.getAllUsers();
    this.getAllStatus();
    this.getAllEvents();
  }

  getAllEvents = () => {
    this.state.users.map(user => {
      fetch("https://api.github.com/users/" + user.login + "/events?per_page=5")
        .then(r => r.json())
        .then(events =>
          this.setState({ allEvents: [...this.state.allEvents, ...events] })
        );
    });
  };

  getAllUsers = () => {
    fetch(`http://localhost:3000/users/`)
      .then(resp => resp.json())
      .then(json => {
        this.setState({ users: json });
      })
      .then(this.getAllEvents);
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

  index = () => {
    return (
      <Grid columns={5}>
        <Grid.Row>
          {this.state.users.map(user => {
            let lastStatus = this.findLastUserStatusesById(user.id);
            let latestEvent = this.findLastEventByUser(user.login);
            return (
              <Grid.Column key={user.id}>
                <Link to={`/${user.login}`}>
                  <UserCard
                    key={user.id}
                    userObj={user}
                    lastestStatus={lastStatus}
                    latestEvent={latestEvent}
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
    if (lastStatus == undefined) {
      return "No status yet...";
    } else {
      return lastStatus.status;
    }
  };

  ///EVENT HERE
  findLastEventByUser = username => {
    let lastEvent = this.state.allEvents.filter(event => {
      return event.actor.login === username;
    })[0];
    if (lastEvent == undefined) {
      return "event was undefined...";
    } else {
      return lastEvent;
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
