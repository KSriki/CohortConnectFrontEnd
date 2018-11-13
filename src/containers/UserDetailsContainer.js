import React from "react";
// import UserCard from "../components/UserCard";
import StatusForm from "../components/StatusForm";
import StatusList from "./StatusList";
import EventsList from "./EventsList";
import UserProfile from "../components/UserProfile";
import { Grid } from "semantic-ui-react";

export default class UserDetailsContainer extends React.Component {
  render() {
    return (
      <Grid columns="equal" >
        <Grid.Row stretched={true}>
          <Grid.Column>
            <UserProfile userObj={this.props.userObj} />
          </Grid.Column>
          <Grid.Column>
            <h1> User Statuses </h1>
            <StatusForm
              user={this.props.userObj}
              addStatus={this.props.addStatus}
            />

            <StatusList
              allUserStatuses={this.props.allUserStatuses}
              userObj={this.props.userObj}
              handleTrashButton={this.props.handleTrashButton}
            />
          </Grid.Column>
          <Grid.Column>
            <EventsList
              eventsList={this.props.allEvents}
              user={this.props.userObj}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
