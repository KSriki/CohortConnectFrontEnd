import React from "react";

import { Feed} from "semantic-ui-react";
import { getDifference } from '../containers/ConnectContainer'

export default class Event extends React.Component {
  render() {
    let gitEvent = this.props.eventObj;
    let repo_url = 'http://github.com'
    // console.log(gitEvent);

    let ago = getDifference(new Date(gitEvent.created_at))
    return (

      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            {gitEvent.type}{" "}
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
