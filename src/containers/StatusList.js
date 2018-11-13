import React from "react";
import Status from "../components/Status";
import { Feed } from "semantic-ui-react";
// StatusList is displayed on each user's details page
// Displayes only the 5 latest Statuses
export default class StatusList extends React.Component {
  render() {
    return (
      <Feed>
        {this.props.allUserStatuses.slice(0, 5).map(status => {
          return (
            <Status
              key={status.id}
              statusObj={status}
              userObj={this.props.userObj}
              handleTrashButton={this.props.handleTrashButton}
            />
          );
        })}
      </Feed>
    );
  }
}
