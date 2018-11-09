import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import StatusForm from './StatusForm'

export default class UserCard extends React.Component {

  handleStatus=(props)=>{
    console.log(props)
  }

  render() {
    let user = this.props.userObj;
    return (
      <Card className="ui card">
        <Image src={user.avatar_url} alt="broken" />
        <Card.Content>
          <Card.Header>{user.name ? user.name : user.login}</Card.Header>
          <Card.Meta>
            <span className="date">{user.github_identifier}</span>
          </Card.Meta>
          <Card.Description>
            {user.bio ? user.bio : "Flatiron Cohort - 082718"}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <p>
            <Icon name="user" />
            {user.login}
          </p>
        </Card.Content>
        <Card.Content className="extra content">
        </Card.Content>
      </Card>
    );
  }
}
