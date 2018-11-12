import React from "react";
import { Card, Icon, Image, Container } from "semantic-ui-react";
import Event from "./Event.js"


export default class UserCard extends React.Component {
  handleStatus = props => {
    console.log(props);
  };

  render() {
    let user = this.props.userObj;
    let avatar_url = "some random link"
    let login = "Octocat"
    if (user) {
      avatar_url = user.avatar_url
      login = user.login
    }
    return (
      <Card className="ui card">
        <Image src={avatar_url} alt="broken" />
        <Card.Content>
          <Card.Description>
          <Container>
            <strong>Latest Status:</strong><br/> {this.props.lastestStatus}
            </Container>
          </Card.Description>
          <Card.Description>
          <Container>
          <strong>Latest Activity:</strong><br/>
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
