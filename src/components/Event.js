import React from "react";

import { Feed} from "semantic-ui-react";
import { getDifference } from '../containers/ConnectContainer'

export default class Event extends React.Component {
  render() {
    let gitEvent = this.props.eventObj;
    let repo_url = 'http://github.com'
    let eventType = "Event Type"
    let repoName = "Repo Name"
    let ago = new Date().toLocaleDateString()
    // console.log(gitEvent);
    if (gitEvent) {
      ago = getDifference(new Date(gitEvent.created_at))
      if (gitEvent.type) {
        eventType = gitEvent.type.split("Event")[0]
      }
      if (gitEvent.repo) {
        repoName = gitEvent.repo.name
      }
    }

    return (

      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            {eventType}{" "}{repoName}
            <Feed.Date>{ago}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>
          {/* eslint-disable-next-line */}
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    );
  }
}


// <a onClick={() => window.open(repo_url, "_blank")}>
//   {gitEvent.repo_name}
// </a>
