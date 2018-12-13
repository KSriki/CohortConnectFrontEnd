import React, { Component } from "react";
import UserCard from "../components/UserCard";
import { Grid } from "semantic-ui-react";
import UserDetailsContainer from "./UserDetailsContainer";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const USERS_URL = "http://localhost:3000/users"
const STATUS_URL = "http://localhost:3000/daily_status/"
const CREATE_STATUS_URL = "http://localhost:3000/daily_status/create";
const DELETE_STATUS_URL = "http://localhost:3000/daily_status/delete"

// Finds the difference in todays date and the date an event/status was made
export function getDifference(status_date) {
  let today = new Date();
  // Return event/status creation date in a readable format using
  // toLocaleDateString. Example: 11/7/2018
  let ago = status_date.toLocaleDateString();

  // first gets the difference in milliseconds
  let difference = today - status_date;
  // then get seconds from milliseconds and round down
  let seconds = Math.floor(difference / 1000);

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

  getAllUsers = () => {
    fetch(USERS_URL)
      .then(resp => resp.json())
      .then(json => {
        this.setState({ users: json });
      })
      .then(this.getAllEvents);
  };

  getAllStatus = () => {
    fetch(STATUS_URL)
      .then(resp => resp.json())
      .then(json => {
        this.setState({ allStatus: json.reverse() });
      });
  };

  // Get last 5 GitHub Events for each user
  getAllEvents = () => {
    this.state.users.map(user => {
      fetch("https://api.github.com/users/" + user.login + "/events?per_page=5")
        .then(r => r.json())
        .then(events =>
          this.setState({ allEvents: [...this.state.allEvents, ...events] })
        );
    });
  };

  // Update a user's current 'status' i.e. what they're working on
  addStatus = (event, userID) => {
    let input = event.currentTarget.statusInput.value;
    // Handle blank submission
    if (input.trim().length === 0) {
      alert("Please enter a status!");
      return;
    }
    // Post to DB and store in state
    let body = { dailyStatus: { user_id: userID, status: input } };
    fetch(CREATE_STATUS_URL, {
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

  // Filters through all statuses and returns a users latest
  findLastUserStatusesById = user_id => {
    let lastStatus = this.state.allStatus.filter(status => {
      return status.user_id === user_id;
    })[0];
    if (lastStatus === undefined) {
      return "No status yet...";
    } else {
      return lastStatus.status;
    }
  };

  // Filters through all GitHub events and returns a user's latest
  findLastEventByUser = username => {
    let lastEvent = this.state.allEvents.filter(event => {
      return event.actor.login === username;
    })[0];
    if (lastEvent === undefined) {
      return "event was undefined...";
    } else {
      return lastEvent;
    }
  };

  // Delete a user's status; called from a user's details page
  handleTrashButton = statusObj => {
    fetch(DELETE_STATUS_URL + `/${statusObj.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(r => r.json())
      .then(() => {
        let copy = [...this.state.allStatus];
        let index = copy.indexOf(statusObj);
        this.setState({
          allStatus: [...copy.slice(0, index), ...copy.slice(index + 1)]
        });
      });
  };

  findUserByUserName = username => {
    return this.state.users.find(user => user.login === username);
  };

  findUserIdByUserName = username => {
    let user = this.state.users.find(user => user.login === username);
    return user.id;
  };

  /////////////////////////////////////////////////////////////////////////
  // Rendering functions start here
  /////////////////////////////////////////////////////////////////////////
  index = () => {
    return (
      <Grid columns={5} stackable={true}>
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

  showUserDetails = props => {
    return (
      <UserDetailsContainer
        handleTrashButton={this.handleTrashButton}
        userObj={this.findUserByUserName(props.match.params.username)}
        addStatus={this.addStatus}
        allEvents={this.state.allEvents.filter(event => {
          return event.actor.login === props.match.params.username;
        })}
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
          <Route path="/:username" render={this.showUserDetails} />
        </Switch>
      </Router>
    );
  }
}
