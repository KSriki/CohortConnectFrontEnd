import React from "react";
import UserCard from "./UserCard";
import StatusForm from "./StatusForm";

export default class UserDetails extends React.Component {
  // Write out user details instead of calling UserCard

  render() {
    return (
      <div>
        <UserCard userObj={this.props.userObj} />
        <StatusForm user={this.props.userObj} addStatus={this.props.addStatus} />
      </div>
    );
  }
}
