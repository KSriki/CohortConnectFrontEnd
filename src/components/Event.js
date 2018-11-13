import React from "react";
import { Item } from "semantic-ui-react";
import { getDifference } from "../containers/ConnectContainer";

export default class Event extends React.Component {
  render() {
    let gitEvent = this.props.eventObj;
    let eventType = "Event Type";
    let repoName = "Repo Name";
    let ago = new Date().toLocaleDateString();

    // Use default variables defined above until fetch promise is fulfilled
    if (gitEvent) {
      ago = getDifference(new Date(gitEvent.created_at));
      if (gitEvent.type) {
        eventType = gitEvent.type.split("Event")[0];
      }
      if (gitEvent.repo) {
        repoName = gitEvent.repo.name;
      }
    }

    return (
      <Item>
        <Item.Header>
          {eventType}: {repoName}
        </Item.Header>
        <Item.Description>{ago}</Item.Description>
      </Item>
    );
  }
}
