import React from "react";
import { Card, Icon, Image, Container } from "semantic-ui-react";
import Event from "./Event.js";

export default class UserCard extends React.Component {
  render() {
    let user = this.props.userObj;
    let avatar_url = "Loading...";
    let login = "Octocat";
    if (user) {
      avatar_url = user.avatar_url;
      login = user.login;
    }
    return (
      <Card className="ui card" style={{ height: "100%" }}>
        <Image src={avatar_url} alt="broken" />
        <Card.Content>
          <Card.Description>
            <Container>
              <strong>Latest Status:</strong>
              <br /> {this.props.lastestStatus}
            </Container>
          </Card.Description>
          <Card.Description>
            <Container>
              <strong>Latest Activity:</strong>
              <br />
              {/* eslint-disable-next-line */}
              <Event eventObj={this.props.latestEvent} userObj={user} />
            </Container>
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <p>
            <Icon name="user" />
            {login}
          </p>
        </Card.Content>
        <Card.Content className="extra content" />
      </Card>
    );
  }
}
