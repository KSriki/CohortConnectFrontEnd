import React from "react";

import { Feed} from "semantic-ui-react";

export default class Event extends React.Component {
  render() {
    let gitEvent = this.props.eventObj;
    // console.log(gitEvent);
    let repo_url =
      "https://github.com/" + gitEvent.repo_url.split("/repos/")[1];

    return (
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            {gitEvent.event_type}{" "}
            <Feed.Date>{gitEvent.time_of_event}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>
          {/* eslint-disable-next-line */}
            <a onClick={() => window.open(repo_url, "_blank")}>
              {gitEvent.repo_name}
            </a>
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    );
  }
}
