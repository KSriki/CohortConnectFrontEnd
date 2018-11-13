import React from "react";
import { Feed, Button } from "semantic-ui-react";
import { getDifference } from "../containers/ConnectContainer";


export default class Status extends React.Component {
  render() {
    let user = this.props.userObj;
    let thisStatus = this.props.statusObj;
    let status_date = new Date(thisStatus.created_at);

    // (((((new Date()) -status_date) / 1000) / 60) / 60) / 24

    let ago = getDifference(status_date);

    return (
      <Feed.Event>
        <Feed.Label image={user.avatar_url} />
        <Feed.Content>
          <Feed.Summary>
            {/* eslint-disable-next-line */}
            <a onClick={() => window.open(user.html_url, "_blank")}>
              {user.login}
            </a>{" "}
            <Feed.Date>{ago}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>{thisStatus.status}</Feed.Extra>
        </Feed.Content>
        <Button icon="trash" onClick={() =>this.props.handleTrashButton(thisStatus)} />
      </Feed.Event>
    );
  }
}
