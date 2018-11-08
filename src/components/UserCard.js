import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

export default class UserCard extends React.Component {


handleStatus = (e) => {
  setTimeout(function (e) {
    console.log(e.target.value), 500
  }
}


  render() {
    let user = this.props.user;
    return (
      <Card className="ui card">
        <Image src={user.avatar_url} alt="broken" />
        <Card.Content>
          <Card.Header>{user.name ? user.name : user.login}</Card.Header>
          <Card.Meta>
            <span className="date">{user.github_identifier}</span>
          </Card.Meta>
          <Card.Description>{user.bio ? user.bio : "Flatiron Cohort - 082718"}</Card.Description>
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
            <input onChange={this.handleStatus} type="text" placeholder="Set status..." />
          </div>
        </Card.Content>
      </Card>
    );
  }
}
