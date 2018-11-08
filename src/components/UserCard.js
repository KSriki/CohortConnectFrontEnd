import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

export default class UserCard extends React.Component {
  render() {
    let user = this.props.user;
    return (
      <Card className="ui card">
        <Image src={user.avatar_url} alt="broken" />
        <Card.Content>
          <Card.Header>{user.name}</Card.Header>
          <Card.Meta>
            <span className="date">{user.github_identifier}</span>
          </Card.Meta>
          <Card.Description>{user.bio}</Card.Description>
        </Card.Content>
        <Card.Content>
          <p>
            <Icon name="user" />
            {user.login}
          </p>
        </Card.Content>
        <Card.Content className="extra content">
          <div className="ui large transparent left icon input">
            <i className="heart outline icon" />
            <input type="text" placeholder="Add Comment..." />
          </div>
        </Card.Content>
      </Card>
    );
  }
}
