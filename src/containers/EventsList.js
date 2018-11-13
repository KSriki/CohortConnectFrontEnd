import React from "react";

import Event from "../components/Event";
import { List } from "semantic-ui-react";

export default class EventsList extends React.Component {
  render() {
    return (
      <List className="ui  divided list">
        <h1>Recent Activity</h1>
        {this.props.eventsList.map(event => {
          return (
            <div className="item" key={event.id}>
              <i className="large github middle aligned icon" />
              <Event className="content header" eventObj={event} />
            </div>
          );
        })}
      </List>
    );
  }
}
