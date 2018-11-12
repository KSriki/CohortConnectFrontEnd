import React from "react";
import UserCard from "../components/UserCard";
import StatusForm from "../components/StatusForm";
import StatusList from "./StatusList";
import EventsList from "./EventsList";

import { Grid } from "semantic-ui-react";

export default class UserDetailsContainer extends React.Component {
  // Write out user details instead of calling UserCard

  constructor() {
    super();

    this.state = {
      allEvents: []
    };
  }

  componentDidMount = () => {
    fetch(`http://localhost:3000/events/${this.props.userObj.id}`)
      .then(resp => resp.json())
      .then(json => {
        this.setState({ allEvents: json });
      });
  };

  render() {
    return (
      <Grid columns={3} divided>
        <Grid.Row>
          <Grid.Column>
            <UserCard userObj={this.props.userObj} />
          </Grid.Column>
          <Grid.Column>
            <StatusForm
              user={this.props.userObj}
              addStatus={this.props.addStatus}
            />
            <StatusList
              allUserStatuses={this.props.allUserStatuses}
              userObj={this.props.userObj}
            />
          </Grid.Column>
          <Grid.Column>
            <EventsList
              eventsList={this.state.allEvents}
              user={this.props.userObj}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
