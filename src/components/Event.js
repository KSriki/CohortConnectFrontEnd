import React from "react";

import { List, Item } from "semantic-ui-react";
import { getDifference } from "../containers/ConnectContainer";

export default class Event extends React.Component {
  render() {
    let gitEvent = this.props.eventObj;
    let repo_url = "http://github.com";
    let eventType = "Event Type";
    let repoName = "Repo Name";
    let ago = new Date().toLocaleDateString();
    // console.log(gitEvent);
    if (gitEvent) {
      ago = getDifference(new Date(gitEvent.created_at));
      if (gitEvent.type) {
        eventType = gitEvent.type.split("Event")[0];
      }
      if (gitEvent.repo) {
        repoName = gitEvent.repo.name;
        repo_url = "https://github.com/" + repoName;
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
