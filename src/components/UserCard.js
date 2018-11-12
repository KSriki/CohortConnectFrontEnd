import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";


export default class UserCard extends React.Component {
  handleStatus = props => {
    console.log(props);
  };

  render() {
    let user = this.props.userObj;
    return (
      <Card className="ui card">
        <Image src={user.avatar_url} alt="broken" />
        <Card.Content>
          <Card.Description>
            {this.props.lastestStatus}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <p>
            <Icon name="user" />
            {user.login}
          </p>
        </Card.Content>
        <Card.Content className="extra content" />
      </Card>
    );
  }
}
